import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({
      success: true,
      data: {
        status: "ok",
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("[health] Error en health check", { error });
    return NextResponse.json(
      { success: false, message: "Error de conexion" },
      { status: 500 }
    );
  }
}
