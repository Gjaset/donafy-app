import FadeInSection from "@/components/ui/FadeInSection";

export default function QuienesSomos() {
  return (
    <section id="quienes-somos" className="bg-white py-16">
      <FadeInSection className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 md:flex-row md:items-center md:px-8">
        <div className="flex-1">
          <h2 className="text-3xl font-semibold text-donafy-text">
            Quienes Somos
          </h2>
          <p className="mt-4 text-sm leading-7 text-donafy-text/70">
            Donafy es una plataforma digital de impacto social fundada por estudiantes de la Universidad EAN, con el propósito de resolver una de las paradojas más persistentes del sistema alimentario colombiano: un país que desperdicia casi 10 millones de toneladas de alimentos al año mientras miles de instituciones vulnerables no tienen garantizado el abastecimiento diario de sus residentes.

            Nacemos como un puente tecnológico entre tres actores que hoy operan de forma desconectada — proveedores de alimentos, instituciones vulnerables y ciudadanos que quieren contribuir de manera confiable y trazable. 
            Nuestra plataforma no reemplaza las redes de apoyo existentes; las complementa, llegando a los espacios que aún no han sido atendidos: municipios pequeños, instituciones no tradicionales y donantes individuales sin canal formal de participación.
            
            Operamos bajo un modelo de triple impacto — económico, social y ambiental — con la convicción de que la tecnología, bien aplicada, puede convertir el desperdicio en sustento y la desconexión en comunidad.
          </p>
        </div>
        <div className="flex-1">
          <div className="aspect-video w-full rounded-2xl bg-donafy-light/30 shadow-[0_2px_12px_rgba(0,0,0,0.08)]" />
        </div>
      </FadeInSection>
    </section>
  );
}
