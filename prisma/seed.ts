import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const basePassword = await bcrypt.hash("admin", 10);

  const usuarios = [
    {
      email: "admin@donafy.com",
      nombre: "Administrador Donafy",
      rol: "admin",
    },
    {
      email: "fundacion@donafy.com",
      nombre: "Fundacion Donafy",
      rol: "fundacion",
    },
    {
      email: "donante@donafy.com",
      nombre: "Donante Donafy",
      rol: "donante",
    },
    {
      email: "ciudadano@donafy.com",
      nombre: "Ciudadano Donafy",
      rol: "ciudadano",
    },
    {
      email: "pendiente@donafy.com",
      nombre: "Pendiente Donafy",
      rol: "pendiente",
    },
  ];

  await Promise.all(
    usuarios.map((usuario) =>
      prisma.usuario.upsert({
        where: { email: usuario.email },
        update: {
          nombre: usuario.nombre,
          password: basePassword,
          rol: usuario.rol,
          activo: true,
        },
        create: {
          nombre: usuario.nombre,
          email: usuario.email,
          password: basePassword,
          rol: usuario.rol,
          activo: true,
        },
      })
    )
  );
}

main()
  .catch((error) => {
    console.error("[seed] Error creando usuario admin", {
      error,
    });
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
