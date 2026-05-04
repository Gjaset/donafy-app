import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { EstadoOrg, Rol } from "@prisma/client";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user?.id || session.user.rol !== Rol.ADMIN) {
      return NextResponse.json(
        { success: false, message: "No autorizado" },
        { status: 403 }
      );
    }

    const { id } = await params;
    const orgId = Number(id);
    if (!orgId) {
      return NextResponse.json(
        { success: false, message: "Organizacion invalida" },
        { status: 400 }
      );
    }

    const organizacion = await prisma.organizacion.findUnique({
      where: { id: orgId },
    });

    if (!organizacion) {
      return NextResponse.json(
        { success: false, message: "Organizacion no encontrada" },
        { status: 404 }
      );
    }

    await prisma.$transaction([
      prisma.organizacion.update({
        where: { id: orgId },
        data: {
          estado: EstadoOrg.APROBADA,
          verificada: true,
          motivoRechazo: null,
        },
      }),
      prisma.usuario.update({
        where: { id: organizacion.usuarioId },
        data: { rol: Rol.FUNDACION },
      }),
    ]);

    return NextResponse.json({ success: true, data: { id: orgId } });
  } catch (error) {
    console.error("[organizaciones/aprobar] Error aprobando organizacion", {
      error,
    });
    return NextResponse.json(
      { success: false, message: "Error interno" },
      { status: 500 }
    );
  }
}
