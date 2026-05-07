"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import TarjetaSolicitud from "@/components/solicitudes/TarjetaSolicitud";
import Toast from "@/components/ui/Toast";
import FadeInSection from "@/components/ui/FadeInSection";
import { Roles } from "@/lib/roles";

const solicitudesMock = [
  {
    id: 1,
    fundacion: "Fundacion Nueva Vida",
    tipo: "ALIMENTO" as const,
    descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    ciudad: "Bogota",
    urgencia: "CRITICA" as const,
  },
  {
    id: 2,
    fundacion: "Comedor Esperanza",
    tipo: "PRODUCTO" as const,
    descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    ciudad: "Medellin",
    urgencia: "ALTA" as const,
  },
  {
    id: 3,
    fundacion: "Fundacion Manos",
    tipo: "ALIMENTO" as const,
    descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    ciudad: "Cali",
    urgencia: "NORMAL" as const,
  },
  {
    id: 4,
    fundacion: "Fundacion Horizonte",
    tipo: "PRODUCTO" as const,
    descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    ciudad: "Bogota",
    urgencia: "BAJA" as const,
  },
];

const urgencias = ["BAJA", "NORMAL", "ALTA", "CRITICA"] as const;
const urgencyRank: Record<(typeof urgencias)[number], number> = {
  CRITICA: 0,
  ALTA: 1,
  NORMAL: 2,
  BAJA: 3,
};

export default function SolicitudesPublicas() {
  const router = useRouter();
  const { data: session } = useSession();
  const [tipo, setTipo] = useState("TODAS");
  const [ciudad, setCiudad] = useState("TODAS");
  const [urgencia, setUrgencia] = useState("TODAS");
  const [toast, setToast] = useState<{
    message: string;
    variant: "success" | "error" | "info";
  } | null>(null);
  const [modal, setModal] = useState<(typeof solicitudesMock)[number] | null>(
    null
  );

  const ciudades = useMemo(() => {
    const values = new Set(solicitudesMock.map((item) => item.ciudad));
    return ["TODAS", ...Array.from(values)];
  }, []);

  const filtered = useMemo(() => {
    return solicitudesMock.filter((item) => {
      const tipoOk = tipo === "TODAS" || item.tipo === tipo;
      const ciudadOk = ciudad === "TODAS" || item.ciudad === ciudad;
      const urgenciaOk = urgencia === "TODAS" || item.urgencia === urgencia;
      return tipoOk && ciudadOk && urgenciaOk;
    });
  }, [tipo, ciudad, urgencia]);

  const ordered = useMemo(() => {
    return [...filtered].sort(
      (a, b) => urgencyRank[a.urgencia] - urgencyRank[b.urgencia]
    );
  }, [filtered]);

  const lastUpdated = useMemo(
    () => new Date().toISOString().slice(0, 10),
    []
  );

  const handleDonar = (solicitud: (typeof solicitudesMock)[number]) => {
    const role = session?.user?.rol as string | undefined;

    if (!session?.user) {
      router.push("/login?mensaje=Inicia%20sesion%20para%20donar");
      return;
    }

    if (role === Roles.DONANTE) {
      setModal(solicitud);
      return;
    }

    if (role === Roles.CIUDADANO) {
      setToast({
        message: "Registrate como donante para poder donar.",
        variant: "info",
      });
      return;
    }

    setToast({
      message: "Solo los donantes pueden completar una donacion.",
      variant: "info",
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setModal(null);
    setToast({
      message: "Gracias por tu interes en donar. Te contactaremos pronto.",
      variant: "success",
    });
  };

  return (
    <section
      id="solicitudes"
      className="bg-donafy-cream py-16 donafy-texture"
    >
      <FadeInSection className="mx-auto w-full max-w-6xl px-4 md:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-donafy-text">
              Solicitudes activas
            </h2>
            <p className="mt-2 text-sm text-donafy-text/70">
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-donafy-text/60">
              <span>Ultima actualizacion: {lastUpdated}</span>
              <span className="h-1 w-1 rounded-full bg-donafy-gray/70" />
              <span>Ordenado por urgencia</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <select
              value={tipo}
              onChange={(event) => setTipo(event.target.value)}
              className="rounded-lg border border-donafy-gray/60 bg-white px-3 py-2 text-sm"
            >
              <option value="TODAS">Tipo</option>
              <option value="ALIMENTO">Alimento</option>
              <option value="PRODUCTO">Producto</option>
            </select>
            <select
              value={ciudad}
              onChange={(event) => setCiudad(event.target.value)}
              className="rounded-lg border border-donafy-gray/60 bg-white px-3 py-2 text-sm"
            >
              {ciudades.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <select
              value={urgencia}
              onChange={(event) => setUrgencia(event.target.value)}
              className="rounded-lg border border-donafy-gray/60 bg-white px-3 py-2 text-sm"
            >
              <option value="TODAS">Urgencia</option>
              {urgencias.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        {toast && (
          <div className="mt-6">
            <Toast
              message={toast.message}
              variant={toast.variant}
              onClose={() => setToast(null)}
            />
          </div>
        )}

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {ordered.map((solicitud) => (
            <TarjetaSolicitud
              key={solicitud.id}
              solicitud={solicitud}
              onDonar={handleDonar}
            />
          ))}
        </div>
      </FadeInSection>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-donafy-text">
                  Donar a {modal.fundacion}
                </h3>
                <p className="text-sm text-donafy-text/70">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModal(null)}
                className="rounded-full border border-donafy-gray/50 px-3 py-1 text-xs text-donafy-text/70"
              >
                Cerrar
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="text-xs font-semibold text-donafy-text">
                  Tipo de donacion
                </label>
                <select className="mt-2 w-full rounded-lg border border-donafy-gray/60 px-3 py-2 text-sm">
                  <option>Alimento</option>
                  <option>Producto</option>
                  <option>Dinero</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-donafy-text">
                  Descripcion
                </label>
                <input
                  className="mt-2 w-full rounded-lg border border-donafy-gray/60 px-3 py-2 text-sm"
                  placeholder="Lorem ipsum dolor"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-donafy-text">
                  Cantidad
                </label>
                <input
                  className="mt-2 w-full rounded-lg border border-donafy-gray/60 px-3 py-2 text-sm"
                  placeholder="Lorem ipsum"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-donafy-text">
                  Mensaje opcional
                </label>
                <textarea
                  className="mt-2 w-full rounded-lg border border-donafy-gray/60 px-3 py-2 text-sm"
                  rows={3}
                  placeholder="Lorem ipsum dolor sit amet"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-donafy-dark px-4 py-2 text-sm font-semibold text-white transition-all duration-200 ease-in-out hover:opacity-90"
              >
                Confirmar donacion
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
