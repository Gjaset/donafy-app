"use client";

import { useEffect } from "react";

type Props = {
  message: string;
  variant?: "success" | "error" | "info";
  onClose?: () => void;
  duration?: number;
};

const variants: Record<string, string> = {
  success: "bg-donafy-dark text-white",
  error: "bg-red-500 text-white",
  info: "bg-donafy-light text-white",
};

export default function Toast({
  message,
  variant = "info",
  onClose,
  duration = 3500,
}: Props) {
  useEffect(() => {
    if (!onClose) {
      return;
    }
    const timeout = setTimeout(() => onClose(), duration);
    return () => clearTimeout(timeout);
  }, [onClose, duration]);

  return (
    <div
      className={`pointer-events-auto rounded-lg px-4 py-3 text-sm font-semibold shadow-[0_2px_12px_rgba(0,0,0,0.08)] ${
        variants[variant]
      }`}
    >
      {message}
    </div>
  );
}
