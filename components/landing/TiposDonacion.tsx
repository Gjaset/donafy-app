import FadeInSection from "@/components/ui/FadeInSection";

const tipos = [
  {
    title: "Alimentos frescos",
    description: "Frutas, verduras, proteínas y lácteos próximos a vencer que los proveedores redistribuyen antes de que se desperdicien. Matching automático con instituciones cercanas.",
  },
  {
    title: "Productos no perecederos",
    description: "Arroz, aceite, legumbres, enlatados y otros productos de larga duración que garantizan abastecimiento constante independientemente de la frecuencia de donación.",
  },
  {
    title: "Donacion monetaria",
    description: "Elige una institución, define el monto y nosotros nos encargamos de comprar exactamente lo que necesitan. Sabrás en qué se usó cada peso con foto de entrega incluida.",
    badge: "Proximamente",
  },
];

export default function TiposDonacion() {
  return (
    <section id="tipos-donacion" className="bg-white py-16">
      <FadeInSection className="mx-auto w-full max-w-6xl px-4 md:px-8">
        <h2 className="text-3xl font-semibold text-donafy-text">
          Tipos de donacion
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {tipos.map((tipo) => (
            <div
              key={tipo.title}
              className="rounded-2xl bg-donafy-cream p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)]"
            >
              {tipo.badge && (
                <span className="rounded-full bg-donafy-light/40 px-3 py-1 text-xs font-semibold text-donafy-dark">
                  {tipo.badge}
                </span>
              )}
              <h3 className="mt-4 text-lg font-semibold text-donafy-text">
                {tipo.title}
              </h3>
              <p className="mt-2 text-sm text-donafy-text/70">
                {tipo.description}
              </p>
            </div>
          ))}
        </div>
      </FadeInSection>
    </section>
  );
}
