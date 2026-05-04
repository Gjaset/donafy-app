-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('ADMIN', 'FUNDACION', 'DONANTE', 'CIUDADANO', 'PENDIENTE_APROBACION');

-- CreateEnum
CREATE TYPE "TipoDonacion" AS ENUM ('ALIMENTO', 'PRODUCTO', 'DINERO');

-- CreateEnum
CREATE TYPE "TipoSolicitud" AS ENUM ('ALIMENTO', 'PRODUCTO');

-- CreateEnum
CREATE TYPE "EstadoDonacion" AS ENUM ('PENDIENTE', 'CONFIRMADA', 'ENTREGADA', 'CANCELADA');

-- CreateEnum
CREATE TYPE "EstadoSolicitud" AS ENUM ('ACTIVA', 'CUBIERTA', 'CANCELADA', 'VENCIDA');

-- CreateEnum
CREATE TYPE "EstadoOrg" AS ENUM ('PENDIENTE', 'APROBADA', 'RECHAZADA');

-- CreateEnum
CREATE TYPE "Urgencia" AS ENUM ('BAJA', 'NORMAL', 'ALTA', 'CRITICA');

-- CreateEnum
CREATE TYPE "TipoDocumento" AS ENUM ('RUT', 'CAMARA_COMERCIO', 'FOTO');

-- CreateEnum
CREATE TYPE "TipoOrganizacion" AS ENUM ('ONG', 'FUNDACION', 'COMEDOR_COMUNITARIO', 'OTRO');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rol" "Rol" NOT NULL DEFAULT 'CIUDADANO',
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organizacion" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "tipo" "TipoOrganizacion" NOT NULL,
    "nit" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "ciudad" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "verificada" BOOLEAN NOT NULL DEFAULT false,
    "estado" "EstadoOrg" NOT NULL DEFAULT 'PENDIENTE',
    "usuarioId" INTEGER NOT NULL,
    "motivoRechazo" TEXT,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Organizacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Documento" (
    "id" SERIAL NOT NULL,
    "organizacionId" INTEGER NOT NULL,
    "tipo" "TipoDocumento" NOT NULL,
    "nombreOriginal" TEXT NOT NULL,
    "ruta" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "tamano" INTEGER NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Documento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Solicitud" (
    "id" SERIAL NOT NULL,
    "organizacionId" INTEGER NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "tipo" "TipoSolicitud" NOT NULL,
    "cantidad" TEXT NOT NULL,
    "urgencia" "Urgencia" NOT NULL DEFAULT 'NORMAL',
    "estado" "EstadoSolicitud" NOT NULL DEFAULT 'ACTIVA',
    "ciudad" TEXT NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Solicitud_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Donacion" (
    "id" SERIAL NOT NULL,
    "donanteId" INTEGER NOT NULL,
    "solicitudId" INTEGER,
    "tipo" "TipoDonacion" NOT NULL,
    "descripcion" TEXT NOT NULL,
    "cantidad" TEXT NOT NULL,
    "estado" "EstadoDonacion" NOT NULL DEFAULT 'PENDIENTE',
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Donacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contacto" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mensaje" TEXT NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Contacto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE INDEX "Usuario_email_idx" ON "Usuario"("email");

-- CreateIndex
CREATE INDEX "Usuario_rol_idx" ON "Usuario"("rol");

-- CreateIndex
CREATE UNIQUE INDEX "Organizacion_nit_key" ON "Organizacion"("nit");

-- CreateIndex
CREATE UNIQUE INDEX "Organizacion_usuarioId_key" ON "Organizacion"("usuarioId");

-- CreateIndex
CREATE INDEX "Organizacion_verificada_idx" ON "Organizacion"("verificada");

-- CreateIndex
CREATE INDEX "Organizacion_estado_idx" ON "Organizacion"("estado");

-- CreateIndex
CREATE INDEX "Documento_organizacionId_idx" ON "Documento"("organizacionId");

-- CreateIndex
CREATE INDEX "Solicitud_estado_idx" ON "Solicitud"("estado");

-- CreateIndex
CREATE INDEX "Solicitud_tipo_idx" ON "Solicitud"("tipo");

-- CreateIndex
CREATE INDEX "Solicitud_organizacionId_idx" ON "Solicitud"("organizacionId");

-- CreateIndex
CREATE INDEX "Donacion_donanteId_idx" ON "Donacion"("donanteId");

-- CreateIndex
CREATE INDEX "Donacion_estado_idx" ON "Donacion"("estado");

-- CreateIndex
CREATE INDEX "Donacion_solicitudId_idx" ON "Donacion"("solicitudId");

-- AddForeignKey
ALTER TABLE "Organizacion" ADD CONSTRAINT "Organizacion_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Documento" ADD CONSTRAINT "Documento_organizacionId_fkey" FOREIGN KEY ("organizacionId") REFERENCES "Organizacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solicitud" ADD CONSTRAINT "Solicitud_organizacionId_fkey" FOREIGN KEY ("organizacionId") REFERENCES "Organizacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donacion" ADD CONSTRAINT "Donacion_donanteId_fkey" FOREIGN KEY ("donanteId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donacion" ADD CONSTRAINT "Donacion_solicitudId_fkey" FOREIGN KEY ("solicitudId") REFERENCES "Solicitud"("id") ON DELETE SET NULL ON UPDATE CASCADE;
