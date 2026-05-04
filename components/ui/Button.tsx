import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export default function Button({
  variant = "primary",
  className = "",
  ...props
}: Props) {
  const base =
    "rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 ease-in-out";
  const styles =
    variant === "primary"
      ? "bg-donafy-dark text-white hover:opacity-90"
      : "border-2 border-donafy-dark text-donafy-dark hover:bg-donafy-dark hover:text-white";

  return (
    <button className={`${base} ${styles} ${className}`.trim()} {...props} />
  );
}
