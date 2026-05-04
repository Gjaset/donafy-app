import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  EstadoOrg,
  Rol,
  TipoDocumento,
  TipoOrganizacion,
} from "@prisma/client";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import crypto from "crypto";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const PDF_SIGNATURES = [[0x25, 0x50, 0x44, 0x46]];
const PNG_SIGNATURES = [[0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]];
const JPG_SIGNATURES = [[0xff, 0xd8, 0xff]];

function getExtension(filename: string) {
  const ext = path.extname(filename || "").replace(".", "");
  return ext.toLowerCase();
}

function hasSignature(buffer: Buffer, signatures: number[][]) {
  return signatures.some((signature) =>
    signature.every((byte, index) => buffer[index] === byte)
  );
}

async function validateFile(
  file: File,
  config: {
    label: string;
    maxSize: number;
    allowedExts: string[];
    allowedMimes: string[];
    signatures: number[][];
    signatureLength: number;
  }
) {
  if (file.size > config.maxSize) {
    return `${config.label} supera el tamano maximo.`;
  }

  const ext = getExtension(file.name);
  if (!config.allowedExts.includes(ext)) {
    return `${config.label} tiene una extension no permitida.`;
  }

  if (!config.allowedMimes.includes(file.type)) {
    return `${config.label} tiene un tipo de archivo no permitido.`;
  }

  const buffer = Buffer.from(
    await file.slice(0, config.signatureLength).arrayBuffer()
  );
  if (!hasSignature(buffer, config.signatures)) {
    return `${config.label} no es un archivo valido.`;
  }

  return null;
}

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: "No autorizado" },
        { status: 401 }
      );
    }

    if (session.user.rol === Rol.ADMIN) {
      return NextResponse.json(
        { success: false, message: "Operacion no permitida" },
        { status: 403 }
      );
    }

    const formData = await request.formData();

    const nombre = String(formData.get("nombre") || "").trim();
    const tipo = String(formData.get("tipo") || "").trim();
    const nit = String(formData.get("nit") || "").trim();
    const direccion = String(formData.get("direccion") || "").trim();
    const ciudad = String(formData.get("ciudad") || "").trim();
    const telefono = String(formData.get("telefono") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const descripcion = String(formData.get("descripcion") || "").trim();

    if (
      !nombre ||
      !tipo ||
      !nit ||
      !direccion ||
      !ciudad ||
      !telefono ||
      !email ||
      !descripcion
    ) {
      return NextResponse.json(
        { success: false, message: "Campos incompletos" },
        { status: 400 }
      );
    }

    if (!Object.values(TipoOrganizacion).includes(tipo as TipoOrganizacion)) {
      return NextResponse.json(
        { success: false, message: "Tipo de organizacion invalido" },
        { status: 400 }
      );
    }

    const rut = formData.get("rut");
    const camara = formData.get("camara");
    const foto = formData.get("foto");

    if (!(rut instanceof File) || !(camara instanceof File) || !(foto instanceof File)) {
      return NextResponse.json(
        { success: false, message: "Archivos requeridos" },
        { status: 400 }
      );
    }

    const pdfValidation = {
      label: "Documento PDF",
      maxSize: MAX_FILE_SIZE,
      allowedExts: ["pdf"],
      allowedMimes: ["application/pdf"],
      signatures: PDF_SIGNATURES,
      signatureLength: 4,
    };

    const imageValidation = {
      label: "Foto",
      maxSize: MAX_FILE_SIZE,
      allowedExts: ["jpg", "jpeg", "png"],
      allowedMimes: ["image/jpeg", "image/png"],
      signatures: [...JPG_SIGNATURES, ...PNG_SIGNATURES],
      signatureLength: 8,
    };

    const rutError = await validateFile(rut, pdfValidation);
    const camaraError = await validateFile(camara, pdfValidation);
    const fotoError = await validateFile(foto, imageValidation);

    if (rutError || camaraError || fotoError) {
      return NextResponse.json(
        { success: false, message: rutError || camaraError || fotoError || "Archivo invalido" },
        { status: 400 }
      );
    }

    const existing = await prisma.organizacion.findUnique({
      where: { usuarioId: Number(session.user.id) },
    });

    if (existing) {
      return NextResponse.json(
        { success: false, message: "Ya existe una organizacion registrada" },
        { status: 400 }
      );
    }

    const uploadDir = path.join(
      process.cwd(),
      "public",
      "uploads",
      "organizaciones",
      String(session.user.id)
    );
    await mkdir(uploadDir, { recursive: true });

    const saveFile = async (file: File, label: string) => {
      const ext = getExtension(file.name);
      const filename = `${label}-${crypto.randomUUID()}.${ext}`;
      const filePath = path.join(uploadDir, filename);
      const buffer = Buffer.from(await file.arrayBuffer());
      await writeFile(filePath, buffer);
      return {
        nombreOriginal: file.name,
        ruta: `/uploads/organizaciones/${session.user.id}/${filename}`,
        mimeType: file.type,
        tamano: file.size,
      };
    };

    const [rutFile, camaraFile, fotoFile] = await Promise.all([
      saveFile(rut, "rut"),
      saveFile(camara, "camara"),
      saveFile(foto, "foto"),
    ]);

    const organizacion = await prisma.$transaction(async (tx) => {
      const created = await tx.organizacion.create({
        data: {
          nombre,
          tipo: tipo as TipoOrganizacion,
          nit,
          direccion,
          ciudad,
          telefono,
          email,
          descripcion,
          estado: EstadoOrg.PENDIENTE,
          verificada: false,
          usuarioId: Number(session.user.id),
          documentos: {
            create: [
              { ...rutFile, tipo: TipoDocumento.RUT },
              { ...camaraFile, tipo: TipoDocumento.CAMARA_COMERCIO },
              { ...fotoFile, tipo: TipoDocumento.FOTO },
            ],
          },
        },
      });

      await tx.usuario.update({
        where: { id: Number(session.user.id) },
        data: { rol: Rol.PENDIENTE_APROBACION },
      });

      return created;
    });

    return NextResponse.json({
      success: true,
      data: { id: organizacion.id },
    });
  } catch (error) {
    console.error("[organizaciones/registro] Error registrando organizacion", {
      error,
    });
    return NextResponse.json(
      { success: false, message: "Error interno" },
      { status: 500 }
    );
  }
}
