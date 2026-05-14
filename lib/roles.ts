export const Roles = {
  ADMIN: "admin",
  FUNDACION: "fundacion",
  DONANTE: "donante",
  CIUDADANO: "ciudadano",
  PENDIENTE_APROBACION: "pendiente",
} as const;

export type AppRole = (typeof Roles)[keyof typeof Roles];

export const roleLabels: Record<AppRole, string> = {
  [Roles.ADMIN]: "Admin",
  [Roles.FUNDACION]: "Fundación",
  [Roles.DONANTE]: "Donante",
  [Roles.CIUDADANO]: "Ciudadano",
  [Roles.PENDIENTE_APROBACION]: "Pendiente Aprobación",
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
