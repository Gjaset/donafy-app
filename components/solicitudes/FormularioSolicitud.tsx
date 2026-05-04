"use client";

import { useState } from "react";

type Props = {
  onSubmit?: (data: {
    titulo: string;
    descripcion: string;
    tipo: "ALIMENTO" | "PRODUCTO";
    cantidad: string;
    urgencia: "BAJA" | "NORMAL" | "ALTA" | "CRITICA";
    ciudad: string;
  }) => void;
};

export default function FormularioSolicitud({ onSubmit }: Props) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const payload = {
      titulo: String(formData.get("titulo") || ""),
      descripcion: String(formData.get("descripcion") || ""),
      tipo: String(formData.get("tipo") || "ALIMENTO") as "ALIMENTO" | "PRODUCTO",
      cantidad: String(formData.get("cantidad") || ""),
      urgencia: String(formData.get("urgencia") || "NORMAL") as
        | "BAJA"
        | "NORMAL"
        | "ALTA"
        | "CRITICA",
      ciudad: String(formData.get("ciudad") || ""),
    };

    onSubmit?.(payload);
    event.currentTarget.reset();
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
      <h3 className="text-lg font-semibold text-donafy-text">
        Nueva solicitud
      </h3>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-xs font-semibold text-donafy-text">Titulo</label>
          <input
            name="titulo"
            required
            className="mt-2 w-full rounded-lg border border-donafy-gray/60 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-donafy-text">Tipo</label>
          <select
            name="tipo"
            className="mt-2 w-full rounded-lg border border-donafy-gray/60 px-3 py-2 text-sm"
          >
            <option value="ALIMENTO">Alimento</option>
            <option value="PRODUCTO">Producto</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-donafy-text">
            Cantidad
          </label>
          <input
            name="cantidad"
            required
            className="mt-2 w-full rounded-lg border border-donafy-gray/60 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-donafy-text">
            Urgencia
          </label>
          <select
            name="urgencia"
            className="mt-2 w-full rounded-lg border border-donafy-gray/60 px-3 py-2 text-sm"
          >
            <option value="BAJA">Baja</option>
            <option value="NORMAL">Normal</option>
            <option value="ALTA">Alta</option>
            <option value="CRITICA">Critica</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-donafy-text">Ciudad</label>
          <input
            name="ciudad"
            required
            className="mt-2 w-full rounded-lg border border-donafy-gray/60 px-3 py-2 text-sm"
          />
        </div>
        <div className="md:col-span-2">
          <label className="text-xs font-semibold text-donafy-text">
            Descripcion
          </label>
          <textarea
            name="descripcion"
            required
            rows={3}
            className="mt-2 w-full rounded-lg border border-donafy-gray/60 px-3 py-2 text-sm"
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="mt-4 rounded-lg bg-donafy-dark px-4 py-2 text-sm font-semibold text-white transition-all duration-200 ease-in-out hover:opacity-90 disabled:opacity-60"
      >
        {loading ? "Guardando..." : "Crear solicitud"}
      </button>
    </form>
  );
}
