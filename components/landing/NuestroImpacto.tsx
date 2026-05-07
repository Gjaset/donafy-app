import FadeInSection from "@/components/ui/FadeInSection";

export default function NuestroImpacto() {
  return (
    <section id="impacto" className="bg-donafy-cream py-16 donafy-texture">
      <FadeInSection className="mx-auto w-full max-w-6xl px-4 md:px-8">
        <h2 className="text-3xl font-semibold text-donafy-text">Nuestro impacto</h2>

        <p className="mt-4 text-sm text-donafy-text/80">
          Donafy no mide su éxito en número de usuarios — lo mide en platos
          servidos, instituciones abastecidas y alimentos rescatados del
          desperdicio. Cada acción dentro de la plataforma genera impacto real
          y medible en cinco dimensiones:
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
            <h3 className="text-lg font-semibold text-donafy-text">Impacto alimentario</h3>
            <p className="mt-2 text-sm text-donafy-text/70">
              Garantizamos que ancianatos, orfanatos, hogares de paso, albergues de
              animales y centros de rehabilitación tengan acceso constante y
              verificado a alimentos nutritivos, superando la dependencia de
              donaciones esporádicas e impredecibles.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
            <h3 className="text-lg font-semibold text-donafy-text">Impacto social</h3>
            <p className="mt-2 text-sm text-donafy-text/70">
              Conectamos instituciones pequeñas en municipios no capitales — invisibles
              para las redes de apoyo actuales — con donantes y proveedores dispuestos a contribuir. Democratizamos el acceso a recursos sin importar el tamaño ni la ubicación de la institución.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
            <h3 className="text-lg font-semibold text-donafy-text">Impacto ambiental</h3>
            <p className="mt-2 text-sm text-donafy-text/70">
              Cada kilogramo de alimento redistribuido es un kilogramo que no llega al vertedero. Reducimos activamente el desperdicio alimentario y las emisiones de gases de efecto invernadero asociadas a la descomposición de materia orgánica.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
            <h3 className="text-lg font-semibold text-donafy-text">Impacto tributario</h3>
            <p className="mt-2 text-sm text-donafy-text/70">
              Facilitamos que las empresas aprovechen los beneficios fiscales establecidos en la Ley 1990 de 2019, convirtiendo cada donación en una decisión financieramente inteligente además de socialmente responsable.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)] md:col-span-2">
            <h3 className="text-lg font-semibold text-donafy-text">Impacto en datos</h3>
            <p className="mt-2 text-sm text-donafy-text/70">
              Cada transacción genera información valiosa sobre patrones de necesidad, zonas con mayor inseguridad alimentaria y comportamiento de donantes — datos que hoy no existen de forma estructurada en Colombia y que tienen valor directo para la política pública y la investigación académica.
            </p>
          </div>
        </div>
      </FadeInSection>
    </section>
  );
}
