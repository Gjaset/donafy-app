type LogoVariant = "dark" | "light" | "medium";

type LogoProps = {
  variant?: LogoVariant;
  size?: number;
  className?: string;
};

const VARIANTS: Record<LogoVariant, { stroke: string; text: string }> = {
  dark: { stroke: "#1F4D3A", text: "#1F4D3A" },
  light: { stroke: "#FFFFFF", text: "#FFFFFF" },
  medium: { stroke: "#FFFFFF", text: "#FFFFFF" },
};

export default function Logo({
  variant = "dark",
  size = 36,
  className = "",
}: LogoProps) {
  const colors = VARIANTS[variant];
  const strokeWidth = 6;

  return (
    <div className={`flex items-center gap-3 ${className}`.trim()}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 80 80"
        width={size}
        height={size}
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M40,62 C40,62 10,42 10,22 C10,6 22,0 40,14 C58,0 70,6 70,22 C70,42 40,62 40,62 Z"
          fill="none"
          stroke={colors.stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="40" cy="28" r="6" fill={colors.stroke} />
      </svg>
      <span
        className="text-xl font-semibold lowercase tracking-tight"
        style={{ color: colors.text }}
      >
        donafy
      </span>
    </div>
  );
}
