"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession, getSession } from "next-auth/react";
import { AppRole, getDashboardPathForRole } from "@/lib/roles";
import Link from "next/link";

const errorMessages: Record<string, string> = {
  MISSING_CREDENTIALS: "Completa todos los campos.",
  INVALID_CREDENTIALS: "Credenciales invalidas.",
  INACTIVE_ACCOUNT: "Cuenta inactiva.",
  RATE_LIMIT: "Demasiados intentos. Intenta mas tarde.",
};

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const incomingMessage = searchParams.get("mensaje");
  const callbackUrl = searchParams.get("callbackUrl");
  const safeCallbackUrl =
    callbackUrl && callbackUrl.startsWith("/") ? callbackUrl : null;

  useEffect(() => {
    if (session?.user?.rol) {
      router.replace(
        safeCallbackUrl ?? getDashboardPathForRole(session.user.rol)
      );
    }
  }, [session, router, safeCallbackUrl]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setMessage(errorMessages[result.error] || "Error al iniciar sesion.");
      setLoading(false);
      return;
    }

    const refreshed = await getSession();
    const role = refreshed?.user?.rol as AppRole | undefined;
    if (safeCallbackUrl) {
      router.replace(safeCallbackUrl);
      return;
    }
    router.replace(role ? getDashboardPathForRole(role) : "/");
  };

  return (
    <div className="flex flex-1 items-center justify-center bg-donafy-cream px-4 py-20">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
        <h1 className="text-2xl font-semibold text-donafy-text">Iniciar sesion</h1>
        <p className="mt-2 text-sm text-donafy-text/70">
          Ingresa con tu cuenta para acceder a tu panel de donante, institución o administrador.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-semibold text-donafy-text">Email</label>
            <input
              name="email"
              type="email"
              required
              className="mt-2 w-full rounded-lg border border-donafy-gray/60 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-donafy-text">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              className="mt-2 w-full rounded-lg border border-donafy-gray/60 px-3 py-2 text-sm"
            />
          </div>
          {(message ?? incomingMessage) && (
            <p className="rounded-lg border border-donafy-light/40 bg-donafy-cream px-4 py-2 text-xs text-donafy-text">
              {message ?? incomingMessage}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-donafy-dark px-4 py-2 text-sm font-semibold text-white transition-all duration-200 ease-in-out hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
        <p className="mt-6 text-center text-xs text-donafy-text/70">
          No tienes cuenta?{" "}
          <Link href="/registro" className="font-semibold text-donafy-dark">
            Registrate
          </Link>
        </p>
      </div>
    </div>
  );
}
