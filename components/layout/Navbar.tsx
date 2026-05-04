"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Logo from "@/components/ui/Logo";
import { AppRole, getDashboardPathForRole, roleLabels } from "@/lib/roles";

const navLinks = [
  { label: "Inicio", href: "/#hero" },
  { label: "Solicitudes", href: "/#solicitudes" },
  { label: "Quienes somos", href: "/#quienes-somos" },
  { label: "Contacto", href: "/#contacto" },
];

export default function Navbar() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  const role = session?.user?.rol as AppRole | undefined;
  const dashboardPath = role ? getDashboardPathForRole(role) : "/";

  return (
    <header className="sticky top-0 z-50 w-full bg-donafy-dark text-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 md:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Logo variant="light" size={34} />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/90 transition-all duration-200 ease-in-out hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {!session?.user && (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-white/90 transition-all duration-200 ease-in-out hover:text-white"
              >
                Iniciar sesion
              </Link>
              <Link
                href="/registro"
                className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-donafy-dark transition-all duration-200 ease-in-out hover:opacity-90"
              >
                Registrarse
              </Link>
            </>
          )}
          {session?.user && (
            <div className="flex items-center gap-3">
              <div className="hidden flex-col text-right lg:flex">
                <span className="text-sm font-semibold">
                  {session.user.nombre}
                </span>
                <span className="text-xs text-white/70">
                  {role ? roleLabels[role] : "Usuario"}
                </span>
              </div>
              <Link
                href={dashboardPath}
                className="rounded-lg bg-donafy-light px-4 py-2 text-sm font-semibold text-white transition-all duration-200 ease-in-out hover:opacity-90"
              >
                Mi panel
              </Link>
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="rounded-lg border border-white/40 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 ease-in-out hover:bg-white hover:text-donafy-dark"
              >
                Cerrar sesion
              </button>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center justify-center rounded-lg border border-white/20 p-2 transition-all duration-200 ease-in-out hover:bg-white/10 md:hidden"
          aria-expanded={open}
          aria-label="Menu"
        >
          <span className="sr-only">Menu</span>
          <div className="flex flex-col gap-1">
            <span className="h-0.5 w-5 rounded-full bg-white" />
            <span className="h-0.5 w-5 rounded-full bg-white" />
            <span className="h-0.5 w-5 rounded-full bg-white" />
          </div>
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-donafy-dark px-4 pb-4 md:hidden">
          <nav className="flex flex-col gap-3 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-white/90 transition-all duration-200 ease-in-out hover:text-white"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-3">
            {!session?.user && (
              <>
                <Link
                  href="/login"
                  className="rounded-lg border border-white/40 px-4 py-2 text-center text-sm font-semibold text-white transition-all duration-200 ease-in-out hover:bg-white hover:text-donafy-dark"
                  onClick={() => setOpen(false)}
                >
                  Iniciar sesion
                </Link>
                <Link
                  href="/registro"
                  className="rounded-lg bg-white px-4 py-2 text-center text-sm font-semibold text-donafy-dark transition-all duration-200 ease-in-out hover:opacity-90"
                  onClick={() => setOpen(false)}
                >
                  Registrarse
                </Link>
              </>
            )}
            {session?.user && (
              <>
                <Link
                  href={dashboardPath}
                  className="rounded-lg bg-donafy-light px-4 py-2 text-center text-sm font-semibold text-white transition-all duration-200 ease-in-out hover:opacity-90"
                  onClick={() => setOpen(false)}
                >
                  Mi panel
                </Link>
                <button
                  type="button"
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="rounded-lg border border-white/40 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 ease-in-out hover:bg-white hover:text-donafy-dark"
                >
                  Cerrar sesion
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
