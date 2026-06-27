import { ReactNode } from "react";
import clsx from "clsx";

interface AppLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function AppLayout({
  children,
  className,
}: AppLayoutProps) {
  return (
    <main
      className={clsx(
        "min-h-screen bg-slate-100",
        className
      )}
    >
      <div
        className="
          mx-auto
          flex
          min-h-screen
          w-full
          max-w-md
          flex-col
          bg-white
          shadow-xl
        "
      >
        {children}
      </div>
    </main>
  );
}