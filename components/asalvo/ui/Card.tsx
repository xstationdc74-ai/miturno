import { ReactNode } from "react"
import clsx from "clsx"

interface CardProps {
  children: ReactNode
  className?: string
}

export default function Card({
  children,
  className,
}: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-3xl bg-white shadow-sm border border-gray-100",
        "p-5",
        className
      )}
    >
      {children}
    </div>
  )
}