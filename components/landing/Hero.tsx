import Link from "next/link";
import FadeInSection from "@/components/ui/FadeInSection";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-donafy-cream donafy-texture"
    >
      <div className="absolute -left-24 top-16 h-56 w-56 rounded-full bg-donafy-light/40 blur-3xl" />
      <div className="absolute -right-20 -top-10 h-64 w-64 rounded-full bg-donafy-dark/20 blur-3xl" />

      <FadeInSection className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-16 md:flex-row md:items-center md:justify-between md:px-8 md:py-24">
        <div className="flex max-w-xl flex-col gap-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-donafy-dark">
            Donafy
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-donafy-dark">
            <span className="rounded-full bg-white/80 px-3 py-1 shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
              12,800 kg donados
            </span>
            <span className="text-donafy-text/60">
              Lorem ipsum dolor sit amet
            </span>
          </div>
          <h1 className="text-4xl font-semibold leading-tight text-donafy-text md:text-5xl">
            Lorem ipsum dolor sit amet consectetur adipiscing elit
          </h1>
          <p className="text-base leading-7 text-donafy-text/80">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/#solicitudes"
              className="rounded-lg bg-donafy-dark px-6 py-3 text-center text-sm font-semibold text-white transition-all duration-200 ease-in-out hover:opacity-90"
            >
              Donar ahora
            </Link>
            <Link
              href="/registro-organizacion"
              className="rounded-lg border-2 border-donafy-dark px-6 py-3 text-center text-sm font-semibold text-donafy-dark transition-all duration-200 ease-in-out hover:bg-donafy-dark hover:text-white"
            >
              Registrar organizacion
            </Link>
          </div>
          <p className="text-xs text-donafy-text/60">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
          <h3 className="text-lg font-semibold text-donafy-text">
            Impacto reciente
          </h3>
          <p className="mt-2 text-sm text-donafy-text/70">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore.
          </p>
          <div className="mt-4 grid gap-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-donafy-text/70">Donaciones activas</span>
              <span className="font-semibold text-donafy-dark">320</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-donafy-text/70">Organizaciones</span>
              <span className="font-semibold text-donafy-dark">87</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-donafy-text/70">Solicitudes urgentes</span>
              <span className="font-semibold text-donafy-dark">12</span>
            </div>
          </div>
        </div>
      </FadeInSection>
    </section>
  );
}
