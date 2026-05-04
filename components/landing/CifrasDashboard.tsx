"use client";

import { useEffect, useRef, useState } from "react";
import FadeInSection from "@/components/ui/FadeInSection";

const stats = [
  { label: "Donaciones realizadas", value: 1240 },
  { label: "Organizaciones registradas", value: 87 },
  { label: "Personas beneficiadas", value: 5300 },
  { label: "Kg de alimentos donados", value: 12800 },
];

export default function CifrasDashboard() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasAnimated) {
      return;
    }

    const duration = 1200;
    const start = performance.now();
    let frame = 0;

    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const nextCounts = stats.map((stat) =>
        Math.round(stat.value * progress)
      );
      setCounts(nextCounts);

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [hasAnimated]);

  return (
    <section id="cifras" className="bg-white py-16">
      <FadeInSection>
        <div
          ref={ref}
          className="mx-auto grid w-full max-w-6xl gap-6 px-4 md:grid-cols-4 md:px-8"
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="rounded-2xl bg-donafy-cream p-6 text-center shadow-[0_2px_12px_rgba(0,0,0,0.08)]"
            >
              <p className="text-3xl font-semibold text-donafy-dark">
                {counts[index].toLocaleString("es-CO")}
              </p>
              <p className="mt-2 text-sm text-donafy-text/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </FadeInSection>
    </section>
  );
}
