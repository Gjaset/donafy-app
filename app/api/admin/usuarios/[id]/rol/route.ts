import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { isValidRole, VALID_ROLES } from "@/lib/validations";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user?.id || session.user.rol !== "admin") {
      return NextResponse.json(
        { success: false, message: "No autorizado" },
        { status: 403 }
      );
    }

    const { id } = await params;
    const userId = Number(id);
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Usuario invalido" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const rol = String(body?.rol || "").trim();
    const activo = body?.activo;

    if (!isValidRole(rol)) {
      return NextResponse.json(
        { success: false, message: "Rol invalido" },
        { status: 400 }
      );
    }

    const updated = await prisma.usuario.update({
      where: { id: userId },
      data: {
        rol,
        ...(typeof activo === "boolean" ? { activo } : {}),
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("[admin/usuarios/rol] Error actualizando usuario", { error });
    return NextResponse.json(
      { success: false, message: "Error interno" },
      { status: 500 }
    );
  }
}
