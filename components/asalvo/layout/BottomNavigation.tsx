"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  House,
  Bell,
  User,
} from "lucide-react";

const items = [
  {
    href: "/asalvo/groups",
    label: "Inicio",
    icon: House,
  },
  {
    href: "/asalvo/activity",
    label: "Actividad",
    icon: Bell,
  },
  {
    href: "/asalvo/profile",
    label: "Perfil",
    icon: User,
  },
];

export default function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav
      className="
        fixed
        bottom-0
        left-0
        right-0
        z-40
        border-t
        border-slate-200
        bg-white/95
        backdrop-blur-md
      "
    >
      <div className="mx-auto flex h-20 max-w-md items-center justify-around px-4 pb-safe">

        {items.map((item) => {
          const Icon = item.icon;

          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex flex-col items-center justify-center gap-1 transition-all duration-200",
                active
                  ? "text-emerald-600"
                  : "text-slate-400 hover:text-slate-600"
              )}
            >
              <Icon
                size={22}
                strokeWidth={2}
              />

              <span className="text-[11px] font-medium">
                {item.label}
              </span>

            </Link>
          );
        })}

      </div>
    </nav>
  );
}