import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const nombre = String(body?.nombre || "").trim();
    const email = String(body?.email || "").trim();
    const mensaje = String(body?.mensaje || "").trim();

    if (!nombre || !email || !mensaje) {
      return NextResponse.json(
        { success: false, message: "Campos incompletos" },
        { status: 400 }
      );
    }

    const contacto = await prisma.contacto.create({
      data: { nombre, email, mensaje },
    });

    return NextResponse.json({
      success: true,
      data: { id: contacto.id },
    });
  } catch (error) {
    console.error("[contacto] Error creando contacto", { error });
    return NextResponse.json(
      { success: false, message: "Error interno" },
      { status: 500 }
    );
  }
}
