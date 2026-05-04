export default function MisDonacionesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-donafy-text">Mis donaciones</h1>
        <p className="mt-2 text-sm text-donafy-text/70">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
        <table className="w-full text-left text-sm">
          <thead className="bg-donafy-cream text-xs uppercase text-donafy-text/70">
            <tr>
              <th className="px-4 py-3">Fundacion</th>
              <th className="px-4 py-3">Tipo</th>
              <th className="px-4 py-3">Cantidad</th>
              <th className="px-4 py-3">Estado</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                fundacion: "Fundacion Nueva Vida",
                tipo: "Alimento",
                cantidad: "40 kg",
                estado: "Confirmada",
              },
              {
                fundacion: "Comedor Esperanza",
                tipo: "Producto",
                cantidad: "15 cajas",
                estado: "Pendiente",
              },
            ].map((item) => (
              <tr key={item.fundacion} className="border-t border-donafy-gray/20">
                <td className="px-4 py-3 font-medium text-donafy-text">
                  {item.fundacion}
                </td>
                <td className="px-4 py-3 text-donafy-text/70">{item.tipo}</td>
                <td className="px-4 py-3 text-donafy-text/70">
                  {item.cantidad}
                </td>
                <td className="px-4 py-3 text-xs text-donafy-text/70">
                  {item.estado}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
