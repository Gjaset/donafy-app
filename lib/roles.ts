export const Roles = {
  ADMIN: "ADMIN",
  FUNDACION: "FUNDACION",
  DONANTE: "DONANTE",
  CIUDADANO: "CIUDADANO",
  PENDIENTE_APROBACION: "PENDIENTE_APROBACION",
} as const;

export type AppRole = (typeof Roles)[keyof typeof Roles];

export const roleLabels: Record<AppRole, string> = {
  [Roles.ADMIN]: "Admin",
  [Roles.FUNDACION]: "Fundacion",
  [Roles.DONANTE]: "Donante",
  [Roles.CIUDADANO]: "Ciudadano",
  [Roles.PENDIENTE_APROBACION]: "Pendiente",
};

export function getDashboardPathForRole(role: AppRole) {
  switch (role) {
    case Roles.ADMIN:
      return "/admin/dashboard";
    case Roles.FUNDACION:
      return "/fundacion/dashboard";
    case Roles.DONANTE:
      return "/donante/dashboard";
    case Roles.CIUDADANO:
      return "/ciudadano/dashboard";
    case Roles.PENDIENTE_APROBACION:
      return "/pendiente";
    default:
      return "/";
  }
}
