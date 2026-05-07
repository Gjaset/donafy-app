import FadeInSection from "@/components/ui/FadeInSection";

const items = [
  {
    title: "Validacion de organizaciones",
    description:
      "Todas las instituciones pasan por un proceso de verificación digital antes de recibir donaciones. Solo entidades legítimas y activas hacen parte de nuestra red.",
  },
  {
    title: "Trazabilidad de donaciones",
    description:
      "Cada donación genera un registro completo — quién donó, qué se compró, cuándo llegó y a quién benefició. El donante recibe foto de entrega y confirmación en tiempo real.",
  },
  {
    title: "Reportes claros",
    description:
      "Proveedores y donantes acceden a un dashboard con métricas de su impacto individual — kg donados, personas beneficiadas y certificado tributario descargable automáticamente.",
  },
];

export default function Transparencia() {
  return (
    <section id="transparencia" className="bg-white py-16">
      <FadeInSection className="mx-auto w-full max-w-6xl px-4 md:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-donafy-text">
              Transparencia
            </h2>
            <p className="mt-2 text-sm text-donafy-text/70">
              En Donafy cada peso donado y cada kilogramo redistribuido es visible, verificable y trazable desde el primer momento.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl bg-donafy-cream p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-donafy-dark shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M8 12h8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-donafy-text">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-donafy-text/70">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </FadeInSection>
    </section>
  );
}
