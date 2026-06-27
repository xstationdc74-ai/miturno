import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  fullWidth?: boolean;
}

export default function Button({
  children,
  className,
  variant = "primary",
  fullWidth = false,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "h-12 rounded-2xl px-5 font-medium transition-all duration-200",
        "disabled:opacity-50 disabled:cursor-not-allowed",

        {
          "bg-green-600 text-white hover:bg-green-700":
            variant === "primary",

          "bg-white text-gray-900 hover:bg-gray-100":
            variant === "secondary",

          "bg-transparent text-green-600 hover:bg-green-50":
            variant === "ghost",
        },

        fullWidth && "w-full",

        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}