import clsx from "clsx"
import { ReactNode } from "react"

type Variant =
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "invite"

interface StatusBadgeProps {
  children: ReactNode
  variant?: Variant
  className?: string
}

export default function StatusBadge({
  children,
  variant = "info",
  className,
}: StatusBadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium",
        {
          "bg-green-100 text-green-700": variant === "success",
          "bg-blue-100 text-blue-700": variant === "info",
          "bg-amber-100 text-amber-700": variant === "warning",
          "bg-red-100 text-red-700": variant === "danger",
          "bg-violet-100 text-violet-700": variant === "invite",
        },
        className
      )}
    >
      {children}
    </span>
  )
}