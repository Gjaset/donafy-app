"use client";

import { useState } from "react";
import Toast from "@/components/ui/Toast";
import FadeInSection from "@/components/ui/FadeInSection";

export default function FormularioContacto() {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    variant: "success" | "error" | "info";
  } | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setToast(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      nombre: String(formData.get("nombre") || ""),
      email: String(formData.get("email") || ""),
      mensaje: String(formData.get("mensaje") || ""),
    };

    try {
      const response = await fetch("/api/contacto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Error al enviar el formulario");
      }

      event.currentTarget.reset();
      setToast({
        message: "Mensaje enviado correctamente.",
        variant: "success",
      });
    } catch (error) {
      console.error("[contacto] Error enviando mensaje", { error });
      setToast({
        message: "No se pudo enviar el mensaje. Intentalo de nuevo.",
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contacto" className="bg-donafy-cream py-16 donafy-texture">
      <FadeInSection className="mx-auto w-full max-w-6xl px-4 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="text-3xl font-semibold text-donafy-text">
              Contacto
            </h2>
            <p className="mt-4 text-sm text-donafy-text/70">
             ¿Eres una institución que necesita apoyo, un proveedor con excedentes o un ciudadano que quiere contribuir? Escríbenos — respondemos en menos de 24 horas y te acompañamos en el proceso de registro.
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)]"
          >
            <div className="grid gap-4">
              <div>
                <label className="text-xs font-semibold text-donafy-text">
                  Nombre
                </label>
                <input
                  name="nombre"
                  required
                  className="mt-2 w-full rounded-lg border border-donafy-gray/60 px-3 py-2 text-sm"
                  placeholder="Nombre"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-donafy-text">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  className="mt-2 w-full rounded-lg border border-donafy-gray/60 px-3 py-2 text-sm"
                  placeholder="email@email.com"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-donafy-text">
                  Mensaje
                </label>
                <textarea
                  name="mensaje"
                  required
                  rows={4}
                  className="mt-2 w-full rounded-lg border border-donafy-gray/60 px-3 py-2 text-sm"
                  placeholder="Escribe tu mensaje aquí..."
                />
              </div>
              {toast && (
                <div className="mt-2">
                  <Toast
                    message={toast.message}
                    variant={toast.variant}
                    onClose={() => setToast(null)}
                  />
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-donafy-dark px-4 py-2 text-sm font-semibold text-white transition-all duration-200 ease-in-out hover:opacity-90 disabled:opacity-60"
              >
                {loading ? "Enviando..." : "Enviar mensaje"}
              </button>
            </div>
          </form>
        </div>
      </FadeInSection>
    </section>
  );
}
