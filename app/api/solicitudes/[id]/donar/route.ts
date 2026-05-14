import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { isValidEstadoSolicitud, isValidTipoDonacion } from "@/lib/validations";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user?.id || session.user.rol !== "donante") {
      return NextResponse.json(
        { success: false, message: "No autorizado" },
        { status: 403 }
      );
    }

    const { id } = await params;
    const solicitudId = Number(id);
    if (!solicitudId) {
      return NextResponse.json(
        { success: false, message: "Solicitud invalida" },
        { status: 400 }
      );
    }

    const solicitud = await prisma.solicitud.findUnique({
      where: { id: solicitudId },
    });

    if (!solicitud || solicitud.estado !== "activa") {
      return NextResponse.json(
        { success: false, message: "Solicitud no disponible" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const tipo = String(body?.tipo || "").trim();
    const descripcion = String(body?.descripcion || "").trim();
    const cantidad = String(body?.cantidad || "").trim();

    if (!tipo || !descripcion || !cantidad) {
      return NextResponse.json(
        { success: false, message: "Campos incompletos" },
        { status: 400 }
      );
    }

    if (!isValidTipoDonacion(tipo)) {
      return NextResponse.json(
        { success: false, message: "Tipo de donacion invalido" },
        { status: 400 }
      );
    }

    const donacion = await prisma.donacion.create({
      data: {
        donanteId: Number(session.user.id),
        solicitudId,
        tipo,
        descripcion,
        cantidad,
      },
    });

    return NextResponse.json({ success: true, data: donacion });
  } catch (error) {
    console.error("[solicitudes/donar] Error creando donacion", { error });
    return NextResponse.json(
      { success: false, message: "Error interno" },
      { status: 500 }
    );
  }
}
