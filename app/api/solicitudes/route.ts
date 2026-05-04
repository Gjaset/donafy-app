import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { EstadoOrg, EstadoSolicitud, Rol, TipoSolicitud, Urgencia } from "@prisma/client";

export async function GET() {
  try {
    const solicitudes = await prisma.solicitud.findMany({
      where: {
        estado: EstadoSolicitud.ACTIVA,
        organizacion: { estado: EstadoOrg.APROBADA, verificada: true },
      },
      include: {
        organizacion: { select: { nombre: true, ciudad: true } },
      },
      orderBy: { creadoEn: "desc" },
    });

    return NextResponse.json({ success: true, data: solicitudes });
  } catch (error) {
    console.error("[solicitudes] Error obteniendo solicitudes", { error });
    return NextResponse.json(
      { success: false, message: "Error interno" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id || session.user.rol !== Rol.FUNDACION) {
      return NextResponse.json(
        { success: false, message: "No autorizado" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const titulo = String(body?.titulo || "").trim();
    const descripcion = String(body?.descripcion || "").trim();
    const tipo = String(body?.tipo || "").trim();
    const cantidad = String(body?.cantidad || "").trim();
    const urgencia = String(body?.urgencia || "").trim();
    const ciudad = String(body?.ciudad || "").trim();

    if (!titulo || !descripcion || !tipo || !cantidad || !urgencia || !ciudad) {
      return NextResponse.json(
        { success: false, message: "Campos incompletos" },
        { status: 400 }
      );
    }

    if (!Object.values(TipoSolicitud).includes(tipo as TipoSolicitud)) {
      return NextResponse.json(
        { success: false, message: "Tipo invalido" },
        { status: 400 }
      );
    }

    if (!Object.values(Urgencia).includes(urgencia as Urgencia)) {
      return NextResponse.json(
        { success: false, message: "Urgencia invalida" },
        { status: 400 }
      );
    }

    const organizacion = await prisma.organizacion.findUnique({
      where: { usuarioId: Number(session.user.id) },
    });

    if (!organizacion || organizacion.estado !== EstadoOrg.APROBADA) {
      return NextResponse.json(
        { success: false, message: "Organizacion no aprobada" },
        { status: 403 }
      );
    }

    const solicitud = await prisma.solicitud.create({
      data: {
        titulo,
        descripcion,
        tipo: tipo as TipoSolicitud,
        cantidad,
        urgencia: urgencia as Urgencia,
        ciudad,
        organizacionId: organizacion.id,
      },
    });

    return NextResponse.json({ success: true, data: solicitud });
  } catch (error) {
    console.error("[solicitudes] Error creando solicitud", { error });
    return NextResponse.json(
      { success: false, message: "Error interno" },
      { status: 500 }
    );
  }
}
