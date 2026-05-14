"use client";

import { useState } from "react";
import FormularioSolicitud from "@/components/solicitudes/FormularioSolicitud";

type Solicitud = {
  id: number;
  titulo: string;
  tipo: "ALIMENTO" | "PRODUCTO";
  cantidad: string;
  urgencia: "BAJA" | "NORMAL" | "ALTA" | "CRITICA";
  ciudad: string;
  estado: "ACTIVA" | "CUBIERTA" | "CANCELADA";
  donaciones: number;
};

const initialSolicitudes: Solicitud[] = [
  {
    id: 1,
    titulo: "Alimentos no perecederos para ninos",
    tipo: "ALIMENTO",
    cantidad: "200 kg",
    urgencia: "ALTA",
    ciudad: "Bogota",
    estado: "ACTIVA",
    donaciones: 3,
  },
];

export default function SolicitudesFundacionPage() {
  const [solicitudes, setSolicitudes] = useState(initialSolicitudes);

  const handleCreate = (data: Omit<Solicitud, "id" | "estado" | "donaciones">) => {
    setSolicitudes((prev) => [
      {
        id: prev.length + 1,
        estado: "ACTIVA",
        donaciones: 0,
        ...data,
      },
      ...prev,
    ]);
  };

  const updateEstado = (id: number, estado: Solicitud["estado"]) => {
    setSolicitudes((prev) =>
      prev.map((item) => (item.id === id ? { ...item, estado } : item))
    );
  };

  return (
    <div className="space-y-6">
      <div id="nueva">
        <FormularioSolicitud onSubmit={handleCreate} />
      </div>

      <div className="space-y-4">
        {solicitudes.map((solicitud) => (
          <div
            key={solicitud.id}
            className="rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)]"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-donafy-text">
                  {solicitud.titulo}
                </h3>
                <p className="text-xs text-donafy-text/60">
                  {solicitud.ciudad} • {solicitud.tipo} • {solicitud.urgencia}
                </p>
              </div>
              <span className="rounded-full bg-donafy-light/30 px-3 py-1 text-xs font-semibold text-donafy-dark">
                {solicitud.estado}
              </span>
            </div>
            <p className="mt-2 text-sm text-donafy-text/70">
              Cantidad: {solicitud.cantidad}
            </p>
            <p className="text-xs text-donafy-text/60">
              Donaciones recibidas: {solicitud.donaciones}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => updateEstado(solicitud.id, "CUBIERTA")}
                className="rounded-lg bg-donafy-dark px-3 py-2 text-xs font-semibold text-white"
              >
                Marcar cubierta
              </button>
              <button
                type="button"
                onClick={() => updateEstado(solicitud.id, "CANCELADA")}
                className="rounded-lg border border-donafy-dark px-3 py-2 text-xs font-semibold text-donafy-dark"
              >
                Cancelar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
