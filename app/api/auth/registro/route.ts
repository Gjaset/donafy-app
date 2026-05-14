import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { isValidPassword, isValidEmail, isValidRole } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const nombre = String(body?.nombre || "").trim();
    const email = String(body?.email || "").trim().toLowerCase();
    const password = String(body?.password || "");
    const rol = String(body?.rol || "");

    if (!nombre || !email || !password) {
      return NextResponse.json(
        { success: false, message: "Campos incompletos" },
        { status: 400 }
      );
    }

    const allowedRoles = ["donante", "ciudadano"];
    const parsedRole = allowedRoles.includes(rol)
      ? rol
      : "ciudadano";

    const existing = await prisma.usuario.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json(
        { success: false, message: "Email ya registrado" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.usuario.create({
      data: {
        nombre,
        email,
        password: hashedPassword,
        rol: parsedRole,
        activo: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: { id: user.id },
    });
  } catch (error) {
    console.error("[auth/registro] Error creando usuario", { error });
    return NextResponse.json(
      { success: false, message: "Error interno" },
      { status: 500 }
    );
  }
}
