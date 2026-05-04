const { PrismaClient, Rol } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const basePassword = await bcrypt.hash("admin", 10);

  const usuarios = [
    {
      email: "admin@donafy.com",
      nombre: "Administrador Donafy",
      rol: Rol.ADMIN,
    },
    {
      email: "fundacion@donafy.com",
      nombre: "Fundacion Donafy",
      rol: Rol.FUNDACION,
    },
    {
      email: "donante@donafy.com",
      nombre: "Donante Donafy",
      rol: Rol.DONANTE,
    },
    {
      email: "ciudadano@donafy.com",
      nombre: "Ciudadano Donafy",
      rol: Rol.CIUDADANO,
    },
    {
      email: "pendiente@donafy.com",
      nombre: "Pendiente Donafy",
      rol: Rol.PENDIENTE_APROBACION,
    },
  ];

  await Promise.all(
    usuarios.map((usuario) =>
      prisma.usuario.upsert({
        where: { email: usuario.email },
        update: {
          nombre: usuario.nombre,
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
