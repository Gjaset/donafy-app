# Donafy — Plataforma de Donación de Alimentos y Bienes

Plataforma colombiana que conecta donantes (restaurantes, empresas, personas) con fundaciones e instituciones vulnerables.

## Stack Tecnológico

| Capa | Tecnología |
|---|---|
| Frontend | Next.js + React + TypeScript + Tailwind CSS |
| Backend | API routes Next.js (Node.js compatible) |
| ORM | Prisma |
| DB Desarrollo | SQLite (local, sin Docker) |
| DB Producción | PostgreSQL (Railway) |
| Pagos | Wompi |
| Storage | Cloudinary |
| Deploy | Railway (API) + Vercel (frontend) |

## Setup Inicial

### 1. Instalar dependencias
```bash
npm install
```

### 2. Crear archivo `setup.js` en la raíz

Copia el siguiente contenido en un archivo `setup.js`:

```javascript
// setup.js - Genera schema.prisma dinámicamente según DATABASE_PROVIDER
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const PROVIDER = process.env.DATABASE_PROVIDER || 'sqlite';
const DIR = __dirname;

// Crear .env files si no existen
const ENV_FILES = {
  '.env.development': `DATABASE_PROVIDER=sqlite\nDATABASE_URL=file:./dev.db\nNODE_ENV=development\n\nNEXTAUTH_URL=http://localhost:3000\nNEXTAUTH_SECRET=development-secret-key\n\nAPI_URL=http://localhost:3000/api\n\nNEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=\nNEXT_PUBLIC_WOMPI_PUBLIC_KEY=\nWOMPI_PRIVATE_KEY=`,
  '.env.production': `DATABASE_PROVIDER=postgresql\nDATABASE_URL=postgresql://user:pass@host:5432/donafy\nNODE_ENV=production\n\nNEXTAUTH_URL=https://donafy.vercel.app\nNEXTAUTH_SECRET=<random-string>\n\nAPI_URL=https://api.donafy.com\n\nNEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=\nNEXT_PUBLIC_WOMPI_PUBLIC_KEY=\nWOMPI_PRIVATE_KEY=`,
  '.env.example': `DATABASE_PROVIDER=sqlite\nDATABASE_URL=file:./dev.db\nNODE_ENV=development\n\nNEXTAUTH_URL=http://localhost:3000\nNEXTAUTH_SECRET=change-me\n\nAPI_URL=http://localhost:3000/api\n\nNEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=\nNEXT_PUBLIC_WOMPI_PUBLIC_KEY=\nWOMPI_PRIVATE_KEY=`,
};

for (const [file, content] of Object.entries(ENV_FILES)) {
  if (!fs.existsSync(file)) fs.writeFileSync(file, content);
}

// Lee el schema actual y reemplaza el provider
const schemaPath = path.join(DIR, 'prisma/schema.prisma');
let schema = fs.readFileSync(schemaPath, 'utf8');
schema = schema.replace(
  /datasource db \{\s*provider = ".*?"/,
  `datasource db {\n  provider = "${PROVIDER}"`
);
fs.writeFileSync(schemaPath, schema);
console.log(`✓ Prisma schema configured for ${PROVIDER}`);
```

### 3. Iniciar la configuración
```bash
npm run setup
```

Este comando ejecuta `setup.js` que:
- Crea `.env.development`, `.env.production`, `.env.example` si no existen
- Configura `prisma/schema.prisma` con el provider correcto (SQLite por defecto)

### 4. Configurar Base de Datos

**Para desarrollo local (SQLite):**
```bash
npm run db:dev
```

**Para Prisma Studio:**
```bash
npm run db:studio
```

**Para reset completo:**
```bash
npm run db:reset
```

**Para producción (PostgreSQL en Railway):**
```bash
npm run db:prod:deploy
```

### 5. Ejecutar en desarrollo
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Scripts Disponibles

- `npm run dev` — Iniciar servidor de desarrollo
- `npm run build` — Construir para producción
- `npm run start` — Ejecutar servidor de producción
- `npm run lint` — Ejecutar linter
- `npm run db:dev` — Configurar BD local (SQLite) con migraciones
- `npm run db:studio` — Abrir Prisma Studio
- `npm run db:reset` — Reset completo de BD
- `npm run db:prod:deploy` — Desplegar migraciones a producción (PostgreSQL)

## Estructura del Proyecto

```
donafy-app/
├── app/                    # Next.js App Router
│   ├── (public)/          # Rutas públicas (login, registro)
│   ├── (dashboard)/       # Rutas protegidas por rol
│   │   ├── admin/
│   │   ├── donante/
│   │   ├── fundacion/
│   │   └── ciudadano/
│   └── api/               # API routes
├── components/            # Componentes React
├── lib/                   # Utilidades y servicios
│   ├── validations.ts     # Validadores (enums, email, etc.)
│   ├── roles.ts           # Gestión de roles
│   ├── auth.ts            # NextAuth configuración
│   └── prisma.ts          # Cliente Prisma
├── prisma/               # Configuración Prisma
│   ├── schema.prisma     # Schema de BD (SQLite/PostgreSQL compatible)
│   ├── seed.ts           # Datos iniciales
│   └── migrations/       # Migraciones
├── types/                # Tipos TypeScript
├── .env.development      # Variables de desarrollo
├── .env.production       # Variables de producción
└── .env.example          # Plantilla
```

## Estrategia Dual de Base de Datos

El proyecto soporta SQLite para desarrollo local y PostgreSQL para producción:

- **Desarrollo (`npm run db:dev`)**: SQLite en `./dev.db`
- **Producción**: PostgreSQL en Railway
- Cambio automático según `DATABASE_PROVIDER` en `.env`

### Compatibilidad

- ✅ Strings en lugar de enums de Prisma
- ✅ Validación en `lib/validations.ts`
- ✅ Sin anotaciones `@db.*` en schema
- ✅ Sin Docker requerido localmente

## Roles de Usuario

```typescript
type UserRole = 'admin' | 'fundacion' | 'donante' | 'ciudadano' | 'pendiente';
```

- **admin**: Gestión de usuarios y reportes
- **fundacion**: Crear solicitudes de donaciones
- **donante**: Ofrecer donaciones
- **ciudadano**: Usuario registrado básico
- **pendiente**: En proceso de aprobación

## API Response Estándar

Todas las respuestas de API siguen este formato:

```typescript
interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error: string | null;
}
```

## Seguridad

- NextAuth para autenticación
- Protección de rutas por rol
- Queries Prisma con `select` explícito (no retorna password)
- Rate limiting en endpoints sensibles
- Variables de entorno nunca en el código

## Contribuir

1. Crea una rama desde `main`
2. Sigue las reglas de arquitectura en `.github/copilot-instructions.md`
3. Asegúrate de que el código sea tipado con TypeScript estricto
4. Haz commit con mensajes descriptivos
5. Abre un pull request

## Deploy

### Frontend (Vercel)
```bash
# Automático al hacer push a main
# O:
vercel deploy
```

### Backend/Migraciones (Railway)
```bash
npm run db:prod:deploy
```

## Recursos

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [NextAuth Docs](https://next-auth.js.org)
- [Tailwind CSS](https://tailwindcss.com)

---

**Nota**: Este proyecto respeta la Ley 2380 de 2024 de Colombia sobre donaciones de alimentos.

## Troubleshooting

### Error: "A datasource must not use the env() function in the provider argument"

**Causa**: Prisma no permite `env()` en el argumento `provider` del datasource.

**Solución**: 
1. Asegúrate de que el archivo `setup.js` está en la raíz del proyecto
2. Ejecuta:
  ```bash
  npm run setup
  npm run db:dev
  ```

El archivo `setup.js` reemplaza dinámicamente el `provider` en `prisma/schema.prisma` según `DATABASE_PROVIDER` en `.env`.

### Error: "Cannot find module 'dotenv'"

**Solución**:
```bash
npm install dotenv
```

### Error de migración en SQLite

**Causa**: Las migraciones previas pueden tener sintaxis PostgreSQL.

**Solución**:
```bash
# Reset completo (cuidado: borra datos)
npm run db:reset
```

## Variables de Entorno Requeridas

### Mínimas (desarrollo local con SQLite)
```env
DATABASE_PROVIDER=sqlite
DATABASE_URL=file:./dev.db
NEXTAUTH_SECRET=any-secret-key
```

### Completas
```env
DATABASE_PROVIDER=sqlite|postgresql
DATABASE_URL=file:./dev.db|postgresql://...
NODE_ENV=development|production
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<random-string>
API_URL=http://localhost:3000/api
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=<opcional>
NEXT_PUBLIC_WOMPI_PUBLIC_KEY=<opcional>
WOMPI_PRIVATE_KEY=<opcional>
```
