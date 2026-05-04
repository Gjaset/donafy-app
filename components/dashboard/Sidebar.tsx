"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { AppRole, roleLabels } from "@/lib/roles";

export type SidebarItem = {
  label: string;
  href: string;
};

type Props = {
  title: string;
  items: SidebarItem[];
};

export default function Sidebar({ title, items }: Props) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const role = session?.user?.rol as AppRole | undefined;

  return (
    <aside className="w-full max-w-[260px] rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
      <div className="border-b border-donafy-gray/30 pb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-donafy-light">
          {title}
        </p>
        <p className="mt-2 text-sm font-semibold text-donafy-text">
          {session?.user?.nombre || "Usuario"}
        </p>
        <p className="text-xs text-donafy-text/60">
          {role ? roleLabels[role] : "Invitado"}
        </p>
      </div>

      <nav className="mt-6 flex flex-col gap-2">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ease-in-out ${
                active
                  ? "bg-donafy-dark text-white"
                  : "text-donafy-text/70 hover:bg-donafy-cream"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-6 border-t border-donafy-gray/30 pt-4">
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full rounded-lg border border-donafy-dark px-3 py-2 text-sm font-semibold text-donafy-dark transition-all duration-200 ease-in-out hover:bg-donafy-dark hover:text-white"
        >
          Cerrar sesion
        </button>
      </div>
    </aside>
  );
}
