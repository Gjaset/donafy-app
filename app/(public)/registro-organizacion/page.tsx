"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Loader from "@/components/ui/Loader";

const tipos = [
  { value: "ONG", label: "ONG" },
  { value: "FUNDACION", label: "Fundacion" },
  { value: "COMEDOR_COMUNITARIO", label: "Comedor comunitario" },
  { value: "OTRO", label: "Otro" },
];

export default function RegistroOrganizacionPage() {
  const router = useRouter();
  const { status } = useSession();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      const callbackUrl = encodeURIComponent("/registro-organizacion");
      router.replace(
        `/login?mensaje=Inicia%20sesion%20para%20continuar&callbackUrl=${callbackUrl}`
      );
    }
  }, [status, router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/organizaciones/registro", {
        method: "POST",
        body: formData,
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload?.message || "Error al enviar la solicitud");
      }

      router.push("/pendiente");
    } catch (error) {
      console.error("[registro-organizacion] Error enviando solicitud", {
        error,
      });
      setMessage("No se pudo enviar la solicitud. Intentalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex flex-1 items-center justify-center py-16">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-donafy-cream py-12">
      <div className="mx-auto w-full max-w-3xl rounded-2xl bg-white p-8 shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
        <h1 className="text-2xl font-semibold text-donafy-text">
          Registro de organizacion
        </h1>
        <p className="mt-2 text-sm text-donafy-text/70">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-xs font-semibold text-donafy-text">
                Nombre
              </label>
              <input
                name="nombre"
                required
                className="mt-2 w-full rounded-lg border border-donafy-gray/60 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-donafy-text">
                Tipo
              </label>
              <select
                name="tipo"
                required
                className="mt-2 w-full rounded-lg border border-donafy-gray/60 px-3 py-2 text-sm"
              >
                {tipos.map((tipo) => (
                  <option key={tipo.value} value={tipo.value}>
                    {tipo.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-donafy-text">NIT</label>
              <input
                name="nit"
                required
                className="mt-2 w-full rounded-lg border border-donafy-gray/60 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-donafy-text">
                Direccion
              </label>
              <input
                name="direccion"
                required
                className="mt-2 w-full rounded-lg border border-donafy-gray/60 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-donafy-text">
                Ciudad
              </label>
              <input
                name="ciudad"
                required
                className="mt-2 w-full rounded-lg border border-donafy-gray/60 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-donafy-text">
                Telefono
              </label>
              <input
                name="telefono"
                required
                className="mt-2 w-full rounded-lg border border-donafy-gray/60 px-3 py-2 text-sm"
              />
            </div>
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
                Descripcion
              </label>
              <textarea
                name="descripcion"
                required
                rows={3}
                className="mt-2 w-full rounded-lg border border-donafy-gray/60 px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="text-xs font-semibold text-donafy-text">
                RUT (PDF)
              </label>
              <input
                name="rut"
                type="file"
                required
                accept="application/pdf"
                className="mt-2 w-full text-sm"
              />
              <p className="mt-1 text-xs text-donafy-text/60">
                Max 5MB. PDF unicamente.
              </p>
            </div>
            <div>
              <label className="text-xs font-semibold text-donafy-text">
                Camara de comercio (PDF)
              </label>
              <input
                name="camara"
                type="file"
                required
                accept="application/pdf"
                className="mt-2 w-full text-sm"
              />
              <p className="mt-1 text-xs text-donafy-text/60">
                Max 5MB. PDF unicamente.
              </p>
            </div>
            <div>
              <label className="text-xs font-semibold text-donafy-text">
                Foto instalaciones (JPG/PNG)
              </label>
              <input
                name="foto"
                type="file"
                required
                accept="image/png, image/jpeg"
                className="mt-2 w-full text-sm"
              />
              <p className="mt-1 text-xs text-donafy-text/60">
                Max 5MB. JPG o PNG.
              </p>
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
            className="rounded-lg bg-donafy-dark px-6 py-3 text-sm font-semibold text-white transition-all duration-200 ease-in-out hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Enviando..." : "Enviar solicitud"}
          </button>
        </form>
      </div>
    </div>
  );
}
