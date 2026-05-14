export function isNonEmpty(value: string) {
  return value.trim().length > 0;
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isValidPassword(value: string) {
  return value.length >= 6;
}

// Validadores de enums (reemplazados en schema.prisma para compatibilidad dual SQLite/PostgreSQL)

export const VALID_ROLES = ['admin', 'fundacion', 'donante', 'ciudadano', 'pendiente'] as const;
export function isValidRole(value: unknown): value is (typeof VALID_ROLES)[number] {
  return typeof value === 'string' && VALID_ROLES.includes(value as any);
}

export const VALID_DONATION_TYPES = ['alimento', 'producto', 'dinero'] as const;
export function isValidTipoDonacion(value: unknown): value is (typeof VALID_DONATION_TYPES)[number] {
  return typeof value === 'string' && VALID_DONATION_TYPES.includes(value as any);
}

export const VALID_REQUEST_TYPES = ['alimento', 'producto'] as const;
export function isValidTipoSolicitud(value: unknown): value is (typeof VALID_REQUEST_TYPES)[number] {
  return typeof value === 'string' && VALID_REQUEST_TYPES.includes(value as any);
}

export const VALID_DONATION_STATUS = ['pendiente', 'confirmada', 'entregada', 'cancelada'] as const;
export function isValidEstadoDonacion(value: unknown): value is (typeof VALID_DONATION_STATUS)[number] {
  return typeof value === 'string' && VALID_DONATION_STATUS.includes(value as any);
}

export const VALID_REQUEST_STATUS = ['activa', 'cubierta', 'cancelada', 'vencida'] as const;
export function isValidEstadoSolicitud(value: unknown): value is (typeof VALID_REQUEST_STATUS)[number] {
  return typeof value === 'string' && VALID_REQUEST_STATUS.includes(value as any);
}

export const VALID_ORG_STATUS = ['pendiente', 'aprobada', 'rechazada'] as const;
export function isValidEstadoOrg(value: unknown): value is (typeof VALID_ORG_STATUS)[number] {
  return typeof value === 'string' && VALID_ORG_STATUS.includes(value as any);
}

export const VALID_URGENCY_LEVELS = ['baja', 'normal', 'alta', 'critica'] as const;
export function isValidUrgencia(value: unknown): value is (typeof VALID_URGENCY_LEVELS)[number] {
  return typeof value === 'string' && VALID_URGENCY_LEVELS.includes(value as any);
}

export const VALID_DOCUMENT_TYPES = ['rut', 'camara_comercio', 'foto'] as const;
export function isValidTipoDocumento(value: unknown): value is (typeof VALID_DOCUMENT_TYPES)[number] {
  return typeof value === 'string' && VALID_DOCUMENT_TYPES.includes(value as any);
}

export const VALID_ORG_TYPES = ['ong', 'fundacion', 'comedor_comunitario', 'otro'] as const;
export function isValidTipoOrganizacion(value: unknown): value is (typeof VALID_ORG_TYPES)[number] {
  return typeof value === 'string' && VALID_ORG_TYPES.includes(value as any);
}
