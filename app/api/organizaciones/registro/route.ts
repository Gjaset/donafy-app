import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isValidTipoDocumento, isValidTipoOrganizacion, isValidEstadoOrg } from "@/lib/validations";
import bcrypt from "bcryptjs";
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

    if (session?.user?.rol === "admin") {
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
    const responsable = String(formData.get("responsable") || "").trim();
    const password = String(formData.get("password") || "");
    const confirmPassword = String(formData.get("confirmPassword") || "");

    let userId = session?.user?.id ? Number(session.user.id) : null;

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

    if (!isValidTipoOrganizacion(tipo)) {
      return NextResponse.json(
        { success: false, message: "Tipo de organizacion invalido" },
        { status: 400 }
      );
    }

    const existingNit = await prisma.organizacion.findUnique({
      where: { nit },
    });

    if (existingNit) {
      return NextResponse.json(
        { success: false, message: "El NIT ya esta registrado" },
        { status: 400 }
      );
    }

    if (!userId) {
      if (!responsable || !email || !password || !confirmPassword) {
        return NextResponse.json(
          { success: false, message: "Campos incompletos" },
          { status: 400 }
        );
      }

      if (password.length < 6) {
        return NextResponse.json(
          { success: false, message: "La password es muy corta" },
          { status: 400 }
        );
      }

      if (password !== confirmPassword) {
        return NextResponse.json(
          { success: false, message: "Las passwords no coinciden" },
          { status: 400 }
        );
      }

      const existingUser = await prisma.usuario.findUnique({
        where: { email },
      });

      if (existingUser) {
        return NextResponse.json(
          { success: false, message: "El email ya esta registrado" },
          { status: 400 }
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const createdUser = await prisma.usuario.create({
        data: {
          nombre: responsable,
          email,
          password: hashedPassword,
          rol: "pendiente",
          activo: true,
        },
      });

      userId = createdUser.id;
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
      where: { usuarioId: Number(userId) },
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
      String(userId)
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
        ruta: `/uploads/organizaciones/${userId}/${filename}`,
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
          tipo,
          nit,
          direccion,
          ciudad,
          telefono,
          email,
          descripcion,
          estado: "pendiente",
          verificada: false,
          usuarioId: Number(userId),
          documentos: {
            create: [
              { ...rutFile, tipo: "rut" },
              { ...camaraFile, tipo: "camara_comercio" },
              { ...fotoFile, tipo: "foto" },
            ],
          },
        },
      });

      await tx.usuario.update({
        where: { id: Number(userId) },
        data: { rol: "pendiente" },
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
