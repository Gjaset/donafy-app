import Link from "next/link";

export default function FundacionDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-donafy-text">
          Panel de fundacion
        </h1>
        <p className="mt-2 text-sm text-donafy-text/70">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
        <h2 className="text-lg font-semibold text-donafy-text">
          Acciones rapidas
        </h2>
        <p className="mt-2 text-sm text-donafy-text/70">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/fundacion/dashboard/solicitudes#nueva"
            className="rounded-lg bg-donafy-dark px-4 py-2 text-sm font-semibold text-white transition-all duration-200 ease-in-out hover:opacity-90"
          >
            Crear solicitud
          </Link>
          <Link
            href="/fundacion/dashboard/solicitudes"
            className="rounded-lg border-2 border-donafy-dark px-4 py-2 text-sm font-semibold text-donafy-dark transition-all duration-200 ease-in-out hover:bg-donafy-dark hover:text-white"
          >
            Ver solicitudes
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {[
          { label: "Solicitudes activas", value: "8" },
          { label: "Donaciones recibidas", value: "34" },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)]"
          >
            <p className="text-sm text-donafy-text/70">{item.label}</p>
            <p className="mt-2 text-3xl font-semibold text-donafy-dark">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
