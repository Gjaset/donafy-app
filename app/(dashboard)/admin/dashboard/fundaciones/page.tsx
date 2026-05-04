"use client";

import { useState } from "react";

type Organizacion = {
  id: number;
  nombre: string;
  nit: string;
  ciudad: string;
  fecha: string;
  documentos: { rut: string; camara: string; foto: string };
  motivo?: string;
};

const pendientesMock: Organizacion[] = [
  {
    id: 1,
    nombre: "Fundacion Luz",
    nit: "900123456",
    ciudad: "Bogota",
    fecha: "2024-05-01",
    documentos: {
      rut: "/uploads/demo-rut.pdf",
      camara: "/uploads/demo-camara.pdf",
      foto: "/uploads/demo-foto.jpg",
    },
  },
];

const aprobadasMock: Organizacion[] = [
  {
    id: 2,
    nombre: "Comedor Vida",
    nit: "900987654",
    ciudad: "Medellin",
    fecha: "2024-04-18",
    documentos: {
      rut: "/uploads/demo-rut.pdf",
      camara: "/uploads/demo-camara.pdf",
      foto: "/uploads/demo-foto.jpg",
    },
  },
];

const rechazadasMock: Organizacion[] = [
  {
    id: 3,
    nombre: "Fundacion Horizonte",
    nit: "900555333",
    ciudad: "Cali",
    fecha: "2024-04-10",
    documentos: {
      rut: "/uploads/demo-rut.pdf",
      camara: "/uploads/demo-camara.pdf",
      foto: "/uploads/demo-foto.jpg",
    },
    motivo: "Documentacion incompleta.",
  },
];

export default function FundacionesPage() {
  const [tab, setTab] = useState("PENDIENTES");
  const [pendientes, setPendientes] = useState(pendientesMock);
  const [aprobadas, setAprobadas] = useState(aprobadasMock);
  const [rechazadas, setRechazadas] = useState(rechazadasMock);
  const [documentos, setDocumentos] = useState<Organizacion | null>(null);
  const [rechazo, setRechazo] = useState<Organizacion | null>(null);
  const [motivo, setMotivo] = useState("");

  const aprobar = (org: Organizacion) => {
    setPendientes((prev) => prev.filter((item) => item.id !== org.id));
    setAprobadas((prev) => [...prev, org]);
  };

  const solicitarRechazo = (org: Organizacion) => {
    setRechazo(org);
    setMotivo("");
  };

  const confirmarRechazo = () => {
    if (!rechazo) {
      return;
    }
    setPendientes((prev) => prev.filter((item) => item.id !== rechazo.id));
    setRechazadas((prev) => [...prev, { ...rechazo, motivo }]);
    setRechazo(null);
  };

  const data =
    tab === "PENDIENTES" ? pendientes : tab === "APROBADAS" ? aprobadas : rechazadas;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-donafy-text">Fundaciones</h1>
        <p className="mt-2 text-sm text-donafy-text/70">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {[
          { label: "Pendientes", value: "PENDIENTES" },
          { label: "Aprobadas", value: "APROBADAS" },
          { label: "Rechazadas", value: "RECHAZADAS" },
        ].map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => setTab(item.value)}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 ease-in-out ${
              tab === item.value
                ? "bg-donafy-dark text-white"
                : "bg-white text-donafy-text/70"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {data.map((org) => (
          <div
            key={org.id}
            className="rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)]"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-donafy-text">
                  {org.nombre}
                </h3>
                <p className="text-xs text-donafy-text/60">NIT {org.nit}</p>
                <p className="text-xs text-donafy-text/60">
                  {org.ciudad} - {org.fecha}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setDocumentos(org)}
                className="rounded-lg border border-donafy-dark px-3 py-1 text-xs font-semibold text-donafy-dark transition-all duration-200 ease-in-out hover:bg-donafy-dark hover:text-white"
              >
                Ver documentos
              </button>
            </div>
            {tab === "RECHAZADAS" && org.motivo && (
              <p className="mt-3 text-xs text-red-600">{org.motivo}</p>
            )}
            {tab === "PENDIENTES" && (
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => aprobar(org)}
                  className="rounded-lg bg-donafy-dark px-3 py-2 text-xs font-semibold text-white"
                >
                  Aprobar
                </button>
                <button
                  type="button"
                  onClick={() => solicitarRechazo(org)}
                  className="rounded-lg border border-donafy-dark px-3 py-2 text-xs font-semibold text-donafy-dark"
                >
                  Rechazar
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {documentos && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-donafy-text">
                  Documentos
                </h3>
                <p className="text-xs text-donafy-text/60">
                  {documentos.nombre}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setDocumentos(null)}
                className="rounded-full border border-donafy-gray/50 px-3 py-1 text-xs text-donafy-text/70"
              >
                Cerrar
              </button>
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <a className="text-donafy-dark underline" href={documentos.documentos.rut}>
                RUT
              </a>
              <a className="text-donafy-dark underline" href={documentos.documentos.camara}>
                Camara de comercio
              </a>
              <a className="text-donafy-dark underline" href={documentos.documentos.foto}>
                Foto
              </a>
            </div>
          </div>
        </div>
      )}

      {rechazo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold text-donafy-text">
                Rechazar solicitud
              </h3>
              <button
                type="button"
                onClick={() => setRechazo(null)}
                className="rounded-full border border-donafy-gray/50 px-3 py-1 text-xs text-donafy-text/70"
              >
                Cerrar
              </button>
            </div>
            <textarea
              value={motivo}
              onChange={(event) => setMotivo(event.target.value)}
              rows={4}
              className="mt-4 w-full rounded-lg border border-donafy-gray/60 px-3 py-2 text-sm"
              placeholder="Motivo del rechazo"
            />
            <button
              type="button"
              onClick={confirmarRechazo}
              className="mt-4 w-full rounded-lg bg-donafy-dark px-4 py-2 text-sm font-semibold text-white"
            >
              Confirmar rechazo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
