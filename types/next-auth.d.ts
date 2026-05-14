import type { DefaultSession } from "next-auth";

// Tipos locales para enums (compatibilidad dual SQLite/PostgreSQL)
export type UserRole = 'admin' | 'fundacion' | 'donante' | 'ciudadano' | 'pendiente';
export type TipoDonacion = 'alimento' | 'producto' | 'dinero';
export type TipoSolicitud = 'alimento' | 'producto';
export type EstadoDonacion = 'pendiente' | 'confirmada' | 'entregada' | 'cancelada';
export type EstadoSolicitud = 'activa' | 'cubierta' | 'cancelada' | 'vencida';
export type EstadoOrg = 'pendiente' | 'aprobada' | 'rechazada';
export type Urgencia = 'baja' | 'normal' | 'alta' | 'critica';
export type TipoDocumento = 'rut' | 'camara_comercio' | 'foto';
export type TipoOrganizacion = 'ong' | 'fundacion' | 'comedor_comunitario' | 'otro';

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      nombre: string;
      rol: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    nombre: string;
    rol: UserRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: number;
    nombre?: string;
    rol?: UserRole;
  }
}
