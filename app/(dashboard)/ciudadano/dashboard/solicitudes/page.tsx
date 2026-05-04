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
];

export default function SolicitudesCiudadanoPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-donafy-text">Solicitudes</h1>
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
