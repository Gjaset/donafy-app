type Props = {
  value: string;
  variant?: "urgencia" | "estado";
  className?: string;
};

const urgenciaStyles: Record<string, string> = {
  BAJA: "bg-donafy-cream text-donafy-text",
  NORMAL: "bg-donafy-light/30 text-donafy-dark",
  ALTA: "bg-amber-200 text-amber-900",
  CRITICA: "bg-red-200 text-red-700",
};

const estadoStyles: Record<string, string> = {
  ACTIVA: "bg-donafy-light/30 text-donafy-dark",
  CUBIERTA: "bg-emerald-200 text-emerald-900",
  CANCELADA: "bg-red-200 text-red-700",
  VENCIDA: "bg-amber-200 text-amber-900",
};

export default function Badge({ value, variant = "urgencia", className = "" }: Props) {
  const styles =
    variant === "estado" ? estadoStyles[value] : urgenciaStyles[value];

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${
        styles || "bg-donafy-cream text-donafy-text"
      } ${className}`.trim()}
    >
      {value}
    </span>
  );
}
