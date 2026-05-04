import FadeInSection from "@/components/ui/FadeInSection";

const steps = [
  {
    title: "Registrate como donante o fundacion",
    description: "Las instituciones vulnerables, proveedores de alimentos y ciudadanos crean su perfil en la plataforma. Cada cuenta pasa por un proceso de verificación digital que garantiza la legitimidad de todos los actores del ecosistema. Las instituciones reciben un score de confianza público que crece con su historial de operación.",
  },
  {
    title: "Publica o encuentra solicitudes de donacion",
    description: "Las instituciones publican sus necesidades semanales con detalle — tipo de alimento, cantidad, urgencia y perfil nutricional de sus residentes. Los proveedores publican sus excedentes o disponibilidad de venta solidaria. Donafy cruza automáticamente ambas publicaciones y sugiere matches compatibles según ubicación, categoría nutricional y urgencia. Los ciudadanos pueden explorar el perfil de cualquier institución y elegir a quién apoyar.",
  },
  {
    title: "Los donantes eligen y contribuyen",
    description: "Una vez confirmado el match, el proveedor coordina la entrega directamente con la institución. Esta confirma la recepción con foto y firma digital. El sistema notifica automáticamente a todos los donantes que contribuyeron a esa necesidad, genera el certificado de donación con respaldo en la Ley 1990 de 2019, y actualiza el dashboard de impacto en tiempo real. Cada peso donado y cada kilogramo redistribuido queda registrado, verificado y visible.",
  },
];

export default function ComoFunciona() {
  return (
    <section id="como-funciona" className="bg-donafy-cream py-16">
      <FadeInSection className="mx-auto w-full max-w-6xl px-4 md:px-8">
        <h2 className="text-3xl font-semibold text-donafy-text">
          Como funciona
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-donafy-light/40 text-sm font-semibold text-donafy-dark">
                0{index + 1}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-donafy-text">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-donafy-text/70">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </FadeInSection>
    </section>
  );
}
