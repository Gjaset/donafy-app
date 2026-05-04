import Link from "next/link";
import Logo from "@/components/ui/Logo";

export default function Footer() {
  return (
    <footer className="mt-auto w-full bg-donafy-dark text-white">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 md:grid-cols-3 md:px-8">
        <div className="flex flex-col gap-4">
          <Logo variant="light" size={36} />
          <p className="text-sm text-white/70">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-semibold uppercase tracking-wide">
            Navegacion
          </h4>
          <Link href="/#hero" className="text-sm text-white/80 hover:text-white">
            Inicio
          </Link>
          <Link
            href="/#solicitudes"
            className="text-sm text-white/80 hover:text-white"
          >
            Solicitudes
          </Link>
          <Link
            href="/#quienes-somos"
            className="text-sm text-white/80 hover:text-white"
          >
            Quienes somos
          </Link>
          <Link
            href="/#contacto"
            className="text-sm text-white/80 hover:text-white"
          >
            Contacto
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-semibold uppercase tracking-wide">
            Unete
          </h4>
          <Link
            href="/registro-organizacion"
            className="text-sm text-white/80 hover:text-white"
          >
            Registrar fundacion
          </Link>
          <Link href="/registro" className="text-sm text-white/80 hover:text-white">
            Soy donante
          </Link>
          <Link
            href="/#solicitudes"
            className="text-sm text-white/80 hover:text-white"
          >
            Ver solicitudes
          </Link>
          <div className="mt-2 text-sm text-white/70">
            contacto@donafy.com
          </div>
          <div className="flex gap-3 text-xs text-white/70">
            {["F", "I", "L"].map((label) => (
              <span
                key={label}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 text-xs"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-white/60">
        (c) 2026 Donafy. Todos los derechos reservados.
      </div>
    </footer>
  );
}
