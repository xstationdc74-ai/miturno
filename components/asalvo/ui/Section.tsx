import { ReactNode } from "react"
import clsx from "clsx"

interface SectionProps {
  title: string
  subtitle?: string
  children: ReactNode
  className?: string
}

export default function Section({
  title,
  subtitle,
  children,
  className,
}: SectionProps) {
  return (
    <section className={clsx("space-y-4", className)}>
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-1 text-sm text-gray-500">
            {subtitle}
          </p>
        )}
      </div>

      {children}
    </section>
  )
}