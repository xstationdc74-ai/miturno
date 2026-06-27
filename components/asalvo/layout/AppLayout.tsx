import { ReactNode } from "react"
import clsx from "clsx"

interface AppLayoutProps {
  children: ReactNode
  className?: string
}

export default function AppLayout({
  children,
  className,
}: AppLayoutProps) {
  return (
    <main
      className={clsx(
        "min-h-screen bg-gray-50",
        className
      )}
    >
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col">
        {children}
      </div>
    </main>
  )
}