import type { DefaultSession } from "next-auth";
import type { Rol } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      nombre: string;
      rol: Rol;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    nombre: string;
    rol: Rol;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: number;
    nombre?: string;
    rol?: Rol;
  }
}
