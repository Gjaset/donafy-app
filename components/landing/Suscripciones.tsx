"use client";

import { useState } from "react";
import FadeInSection from "@/components/ui/FadeInSection";
import Toast from "@/components/ui/Toast";

const planes = [
  {
    id: "basico",
    nombre: "Plan Básico",
    precio: 1500000,
    periodo: "mes",
    descripcion: "Ideal para PYMES y comercios pequeños",
    caracteristicas: [
      "Hasta 50 kg/mes para donar",
      "Descuentos tributarios automatizados",
      "Certificados de donación mensuales",
      "1 usuario administrativo",
      "Soporte por email",
      "Instituciones verificadas",
    ],
    cta: "Comenzar",
  },
  {
    id: "profesional",
    nombre: "Plan Profesional",
    precio: 5000000,
    periodo: "mes",
    descripcion: "Para restaurantes, distribuidoras y empresas medianas",
    caracteristicas: [
      "Hasta 500 kg/mes para donar",
      "Descuentos tributarios automatizados",
      "Certificados de donación semanales",
      "Hasta 5 usuarios administrativos",
      "Dashboard de RSE personalizado",
      "Soporte prioritario 24/7",
      "Reportes personalizados por zona",
      "Integración con sistemas contables",
    ],
    cta: "Contratar",
    destacado: true,
  },
  {
    id: "empresarial",
    nombre: "Plan Empresarial",
    precio: 15000000,
    periodo: "mes",
    descripcion: "Para grandes corporativos con programas sostenibles",
    caracteristicas: [
      "Donaciones ilimitadas",
      "Asesoría fiscal especializada",
      "Reportes en tiempo real",
      "Usuarios ilimitados",
      "Dashboard ejecutivo avanzado",
      "Soporte dedicado 24/7",
      "Análisis de impacto regional",
      "Integración API completa",
      "Auditorías trimestrales",
      "Eventos de impacto social exclusivos",
    ],
    cta: "Contactar ventas",
  },
];

export default function Suscripciones() {
  const [selectedPlan, setSelectedPlan] = useState("profesional");
  const [formData, setFormData] = useState({
    empresa: "",
    nit: "",
    email: "",
    telefono: "",
    plan: "profesional",
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "plan") {
      setSelectedPlan(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.empresa || !formData.nit || !formData.email) {
      setToast({ message: "Por favor completa todos los campos obligatorios", type: "error" });
      return;
    }

    setLoading(true);
    try {
      const planSeleccionado = planes.find((p) => p.id === formData.plan);
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: formData.empresa,
          email: formData.email,
          asunto: `Solicitud B2B - Plan ${planSeleccionado?.nombre}`,
          mensaje: `Empresa: ${formData.empresa}\nNIT: ${formData.nit}\nTeléfono: ${formData.telefono}\nPlan: ${planSeleccionado?.nombre}\n\nInterés en programa de donación empresarial.`,
        }),
      });

      if (res.ok) {
        setToast({
          message: "¡Solicitud enviada! Nuestro equipo de negocios se contactará pronto.",
          type: "success",
        });
        setFormData({ empresa: "", nit: "", email: "", telefono: "", plan: "profesional" });
      } else {
        setToast({ message: "Error al enviar. Intenta de nuevo.", type: "error" });
      }
    } catch (error) {
      setToast({ message: "Error de conexión. Intenta más tarde.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="suscripciones" className="bg-gradient-to-br from-donafy-dark to-donafy-dark/95 py-16 text-white">
      <FadeInSection className="mx-auto w-full max-w-7xl px-4 md:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
            Programa de Donación Empresarial
          </h2>
          <p className="mt-4 text-base leading-7 text-white/80">
            Elige el plan que mejor se adapta a tu empresa. Descuenta impuestos, genera impacto social y mantén transparencia total.
          </p>
        </div>

        {/* Planes */}
        <div className="mb-16 grid gap-6 md:grid-cols-3">
          {planes.map((plan) => (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`relative cursor-pointer rounded-2xl p-6 transition-all duration-200 ${
                selectedPlan === plan.id
                  ? "bg-white/20 ring-2 ring-donafy-secondary/60"
                  : "bg-white/5 hover:bg-white/10"
              } ${plan.destacado ? "md:scale-105" : ""}`}
            >
              {plan.destacado && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-donafy-secondary px-3 py-1 text-xs font-semibold text-white">
                    Más popular
                  </span>
                </div>
              )}

              <h3 className="text-xl font-semibold">{plan.nombre}</h3>
              <p className="mt-2 text-sm text-white/70">{plan.descripcion}</p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-3xl font-bold">
                  ${plan.precio.toLocaleString("es-CO")}
                </span>
                <span className="text-sm text-white/60">/{plan.periodo}</span>
              </div>

              <ul className="mt-6 space-y-3">
                {plan.caracteristicas.map((feature, idx) => (
                  <li key={idx} className="flex gap-3 text-sm">
                    <svg
                      className="h-4 w-4 shrink-0 text-donafy-secondary"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Formulario */}
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl bg-white/10 p-8 backdrop-blur-sm">
            <h3 className="text-xl font-semibold">Solicita más información</h3>
            <p className="mt-2 text-sm text-white/70">
              Completa el formulario y nuestro equipo de negocios te contactará en 24 horas.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold text-white">
                    Razón social *
                  </label>
                  <input
                    type="text"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleChange}
                    placeholder="Nombre de tu empresa"
                    className="mt-2 w-full rounded-lg bg-white/10 px-4 py-3 text-white placeholder-white/50 outline-none transition-all duration-200 focus:bg-white/20 focus:ring-2 focus:ring-white/30"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-white">
                    NIT *
                  </label>
                  <input
                    type="text"
                    name="nit"
                    value={formData.nit}
                    onChange={handleChange}
                    placeholder="123.456.789-0"
                    className="mt-2 w-full rounded-lg bg-white/10 px-4 py-3 text-white placeholder-white/50 outline-none transition-all duration-200 focus:bg-white/20 focus:ring-2 focus:ring-white/30"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-white">
                    Email corporativo *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="contacto@empresa.com"
                    className="mt-2 w-full rounded-lg bg-white/10 px-4 py-3 text-white placeholder-white/50 outline-none transition-all duration-200 focus:bg-white/20 focus:ring-2 focus:ring-white/30"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-white">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder="+57 300 1234567"
                    className="mt-2 w-full rounded-lg bg-white/10 px-4 py-3 text-white placeholder-white/50 outline-none transition-all duration-200 focus:bg-white/20 focus:ring-2 focus:ring-white/30"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-white">
                  Plan de interés *
                </label>
                <select
                  name="plan"
                  value={formData.plan}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-lg bg-white/10 px-4 py-3 text-white outline-none transition-all duration-200 focus:bg-white/20 focus:ring-2 focus:ring-white/30"
                >
                  {planes.map((p) => (
                    <option key={p.id} value={p.id} className="bg-donafy-dark">
                      {p.nombre} - ${p.precio.toLocaleString("es-CO")}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full rounded-lg bg-white px-6 py-3 font-semibold text-donafy-dark transition-all duration-200 hover:opacity-90 disabled:opacity-70"
              >
                {loading ? "Enviando..." : "Solicitar demostración"}
              </button>

              <p className="text-center text-xs text-white/60">
                Nuestro equipo B2B se contactará en 24 horas hábiles.
              </p>
            </form>
          </div>
        </div>

        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </FadeInSection>
    </section>
  );
}