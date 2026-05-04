export default function DonacionesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-donafy-text">Donaciones</h1>
        <p className="mt-2 text-sm text-donafy-text/70">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {[
          "Lorem ipsum dolor sit amet",
          "Consectetur adipiscing elit",
        ].map((item, index) => (
          <div
            key={item}
            className="rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)]"
          >
            <p className="text-sm text-donafy-text/70">Donacion #{index + 1}</p>
            <h3 className="mt-2 text-lg font-semibold text-donafy-text">
              {item}
            </h3>
            <p className="mt-2 text-xs text-donafy-text/60">
              Estado: Confirmada
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
