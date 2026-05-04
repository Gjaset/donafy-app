import TarjetaSolicitud from "@/components/solicitudes/TarjetaSolicitud";

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
];

export default function CiudadanoDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-donafy-light/40 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
        <h1 className="text-xl font-semibold text-donafy-text">
          Quieres donar? Contacta al administrador para cambiar tu cuenta
        </h1>
        <p className="mt-2 text-sm text-donafy-text/70">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {solicitudesMock.map((solicitud) => (
          <TarjetaSolicitud
            key={solicitud.id}
            solicitud={solicitud}
            mostrarAccion={false}
          />
        ))}
      </div>
    </div>
  );
}
