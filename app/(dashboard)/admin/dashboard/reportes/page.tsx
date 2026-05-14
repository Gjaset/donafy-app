export default function ReportesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-donafy-text">Reportes</h1>
        <p className="mt-2 text-sm text-donafy-text/70">
          Consulta reportes detallados de donaciones, instituciones verificadas, estadísticas de impacto y análisis de trazabilidad en la plataforma.
        </p>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
        <p className="text-sm text-donafy-text/70">
          Los reportes se actualizan en tiempo real y pueden ser exportados en diferentes formatos. Analiza tendencias de donación, cubrimiento geográfico y necesidades prioritarias por región para optimizar la gestión de recursos.
        </p>
      </div>
    </div>
  );
}
