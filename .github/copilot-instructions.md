# Donafy — GitHub Copilot Instructions


## Rol
Actúas como Senior Frontend Developer & Software Architect con 10+ años de experiencia.
Dominio experto en React/TypeScript, Node.js, Prisma, PostgreSQL/SQLite, y arquitectura limpia.

---

## El Proyecto

**Donafy** es una plataforma colombiana de donación de alimentos y bienes que conecta
donantes (restaurantes, empresas, personas) con fundaciones e instituciones vulnerables.

### Stack
| Capa | Tecnología |
|---|---|
| Frontend | Next.js + React + TypeScript + Tailwind CSS |
| Backend | Next.js API Routes (Node.js) |
| ORM | Prisma |
| DB Producción | PostgreSQL (Railway) |
| DB Desarrollo | SQLite (local, sin Docker) |
| Pagos | Wompi |
| Storage | Cloudinary |
| Deploy | Vercel (frontend + API) |

### Paleta oficial
```css
--color-primary:    #1F4D3A;  /* verde oscuro */
--color-secondary:  #7BAF7F;  /* verde medio */
--color-background: #F2F5F1;  /* fondo claro */
--color-neutral:    #BDBDBD;  /* gris neutro */
--color-text:       #2E2E2E;  /* texto oscuro */
```

### Roles de usuario
```typescript
type UserRole = 'admin' | 'fundacion' | 'donante' | 'ciudadano' | 'pendiente';
```

---

## Base de datos: estrategia dual (SQLite local / PostgreSQL producción)

### Objetivo
Desarrollo local 100% sin Docker. SQLite para pruebas rápidas, PostgreSQL en Railway para staging y producción.

### Configuración Prisma

**`prisma/schema.prisma`**
```prisma
datasource db {
  provider = "sqlite"  // Por defecto. Será reemplazado por setup.js según DATABASE_PROVIDER
  url      = env("DATABASE_URL")
}
```

El archivo `setup.js` en la raíz del proyecto lee `DATABASE_PROVIDER` del `.env` actual y reemplaza dinámicamente el provider en `schema.prisma` antes de ejecutar migraciones o comandos Prisma.
**`.env.development` (local)**
```env
DATABASE_PROVIDER="sqlite"
DATABASE_URL="file:./dev.db"
NODE_ENV="development"
```

**`.env.production` (Railway)**
```env
DATABASE_PROVIDER="postgresql"
DATABASE_URL="postgresql://user:pass@host:5432/donafy"
NODE_ENV="production"
```

### Compatibilidad SQLite — reglas obligatorias
Al escribir o modificar modelos Prisma, respetar siempre:

| ❌ PostgreSQL-only | ✅ Alternativa compatible |
|---|---|
| `@db.Text` / `@db.VarChar(n)` | `String` sin anotación nativa |
| `@db.JsonB` | `String` + serializar con `JSON.stringify/parse` |
| `enum` de Prisma | `String` + validación en capa de servicio |
| `DateTime @default(now()) @db.Timestamptz` | `DateTime @default(now())` |

### Scripts de base de datos
```bash
npm run db:dev           # configura .env local y aplica migraciones SQLite
npm run db:studio        # Prisma Studio en browser
npm run db:reset         # reset completo + re-seed
npm run db:prod:deploy   # aplica migraciones en Railway (PostgreSQL)
```

---

## Reglas de autocompletado y sugerencias

### TypeScript
- Tipado estricto siempre; **nunca sugerir `any`** salvo que venga con comentario `// justificación:`
- Preferir `interface` sobre `type` para contratos de objeto
- Exportar tipos desde `src/types/index.ts`

### React
- Componentes funcionales con hooks; prohibidos componentes de clase
- Un componente = una responsabilidad; si supera ~150 líneas, sugerir extracción
- Hooks personalizados para lógica reutilizable:

```typescript
// Hooks esperados en el proyecto
useAuth()         // sesión, rol, token
useDonation()     // CRUD de donaciones
useFoundation()   // datos de fundaciones
useUpload()       // integración Cloudinary
```

- Siempre manejar estados `loading` y `error` en componentes que hagan fetch

### API Response — shape estándar
```typescript
interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error: string | null;
}
```

Copilot debe autocomplete siguiendo este contrato en controllers y hooks.

### Protección de rutas (backend)
```typescript
// Patrón obligatorio: auth → rol → handler
router.post('/ruta', authenticate, requireRole(['admin', 'donante']), handler);
```

### Queries Prisma
```typescript
// ✅ Siempre usar select explícito
const user = await prisma.user.findUnique({
  where: { id },
  select: { id: true, name: true, email: true, role: true }
});

// ❌ Nunca retornar el objeto completo (expone password y tokens)
const user = await prisma.user.findUnique({ where: { id } });
```

### Manejo de errores
```typescript
// Patrón estándar para controllers
try {
  const data = await servicio.operacion();
  res.json({ success: true, data, error: null });
} catch (err) {
  const message = err instanceof Error ? err.message : 'Error inesperado';
  res.status(500).json({ success: false, data: null, error: message });
}
```

---

## Contexto Colombia
- Zona horaria: `America/Bogota` (UTC-5)
- Moneda: COP — formatear con `Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' })`
- Documentos: cédula (CC), NIT para empresas
- Pasarela de pagos: **Wompi** (no sugerir Stripe, PayPal ni MercadoPago)
- Marco legal: Ley 2380 de 2024 (donaciones de alimentos)

---

## Lo que Copilot NO debe sugerir
- `docker-compose` ni instrucciones que requieran Docker para desarrollo local
- Librerías fuera del stack declarado sin comentario de propuesta
- Colores distintos a la paleta oficial en componentes nuevos
- `enum` de Prisma (incompatible con SQLite)
- Anotaciones `@db.*` en el schema (rompen la estrategia dual)
- Datos hardcodeados de conexión a DB, API keys o secrets
- Componentes de clase en React
- `any` sin justificación explícita

---

## Estructura de carpetas esperada
```
donafy-app/
├── .github/
│   └── copilot-instructions.md
├── app/                          # Next.js App Router
│   ├── (public)/                 # Rutas públicas
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── login/
│   │   ├── registro/
│   │   └── ...
│   ├── (dashboard)/              # Rutas protegidas por rol
│   │   ├── admin/
│   │   ├── donante/
│   │   ├── fundacion/
│   │   └── ciudadano/
│   ├── api/                      # API Routes
│   ├── globals.css
│   └── layout.tsx
├── components/                   # Componentes React reutilizables
│   ├── dashboard/
│   ├── landing/
│   ├── layout/
│   ├── ui/
│   └── solicitudes/
├── lib/                          # Utilidades y servicios
│   ├── auth.ts                   # Configuración NextAuth
│   ├── prisma.ts                 # Cliente Prisma
│   ├── roles.ts                  # Gestión de roles
│   ├── validations.ts            # Validadores
│   └── rateLimit.ts
├── prisma/
│   ├── schema.prisma             # Schema compatible SQLite/PostgreSQL
│   ├── seed.ts                   # Datos iniciales
│   └── migrations/
├── public/                       # Archivos estáticos
├── types/                        # Tipos TypeScript
│   ├── index.ts                  # Tipos de enums locales
│   └── next-auth.d.ts
├── .env.development              # ← nunca commitear
├── .env.production               # ← nunca commitear
├── .env.example                  # ← sí commitear (sin valores reales)
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Configuración de Variables de Entorno

### Crear `.env.development`
```env
DATABASE_PROVIDER=sqlite
DATABASE_URL=file:./dev.db
NODE_ENV=development

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=development-secret-key

API_URL=http://localhost:3000/api

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_WOMPI_PUBLIC_KEY=
WOMPI_PRIVATE_KEY=
```

### Crear `.env.production`
```env
DATABASE_PROVIDER=postgresql
DATABASE_URL=postgresql://user:pass@host:5432/donafy
NODE_ENV=production

NEXTAUTH_URL=https://donafy.vercel.app
NEXTAUTH_SECRET=<random-string>

API_URL=https://api.donafy.com

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_WOMPI_PUBLIC_KEY=
WOMPI_PRIVATE_KEY=
```

### Crear `.env.example`
```env
DATABASE_PROVIDER=sqlite
DATABASE_URL=file:./dev.db
NODE_ENV=development

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=change-me

API_URL=http://localhost:3000/api

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_WOMPI_PUBLIC_KEY=
WOMPI_PRIVATE_KEY=
```

---

## Formato al revisar código con Copilot Chat

Cuando uses `/fix`, `/explain` o chat libre, estructura así: