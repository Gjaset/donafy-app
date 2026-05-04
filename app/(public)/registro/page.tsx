"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { AppRole, getDashboardPathForRole } from "@/lib/roles";
import Link from "next/link";

export default function RegistroPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      nombre: String(formData.get("nombre") || ""),
      email: String(formData.get("email") || ""),
      password: String(formData.get("password") || ""),
      confirmPassword: String(formData.get("confirmPassword") || ""),
      rol: String(formData.get("rol") || "DONANTE"),
    };

    if (payload.password !== payload.confirmPassword) {
      setMessage("Las passwords no coinciden.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message || "Error al registrar");
      }

      const signInResult = await signIn("credentials", {
        email: payload.email,
        password: payload.password,
        redirect: false,
      });

      if (signInResult?.error) {
        throw new Error("No se pudo iniciar sesion automaticamente");
      }

      const role = payload.rol as AppRole;
      router.replace(getDashboardPathForRole(role));
    } catch (error) {
      console.error("[registro] Error creando usuario", { error });
      setMessage("No se pudo completar el registro.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center bg-donafy-cream px-4 py-20">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
        <h1 className="text-2xl font-semibold text-donafy-text">Registro</h1>
        <p className="mt-2 text-sm text-donafy-text/70">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-semibold text-donafy-text">Nombre</label>
            <input
              name="nombre"
              autoComplete="name"
              required
              className="mt-2 w-full rounded-lg border border-donafy-gray/60 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-donafy-text">Email</label>
            <input
              name="email"
              type="email"
              autoComplete="email"
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
              autoComplete="new-password"
              minLength={6}
              required
              className="mt-2 w-full rounded-lg border border-donafy-gray/60 px-3 py-2 text-sm"
            />
            <p className="mt-1 text-xs text-donafy-text/60">
              Minimo 6 caracteres.
            </p>
          </div>
          <div>
            <label className="text-xs font-semibold text-donafy-text">
              Confirmar password
            </label>
            <input
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              minLength={6}
              required
              className="mt-2 w-full rounded-lg border border-donafy-gray/60 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-donafy-text">
              Tipo de cuenta
            </label>
            <div className="mt-2 flex flex-col gap-3">
              <label className="flex items-center gap-2 text-sm">
                <input type="radio" name="rol" value="DONANTE" defaultChecked />
                Quiero donar
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="radio" name="rol" value="CIUDADANO" />
                Soy ciudadano
              </label>
            </div>
          </div>

          {message && (
            <p className="rounded-lg border border-donafy-light/40 bg-donafy-cream px-4 py-2 text-xs text-donafy-text">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-donafy-dark px-4 py-2 text-sm font-semibold text-white transition-all duration-200 ease-in-out hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Creando..." : "Crear cuenta"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-donafy-text/70">
          Ya tienes cuenta?{" "}
          <Link href="/login" className="font-semibold text-donafy-dark">
            Inicia sesion
          </Link>
        </p>
      </div>
    </div>
  );
}
