"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import clsx from "clsx"
import {
  House,
  Bell,
  User,
} from "lucide-react"

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
]

export default function BottomNavigation() {
  const pathname = usePathname()

  return (
    <nav className="sticky bottom-0 border-t border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-md items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon

          const active =
            pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex flex-col items-center gap-1 text-xs transition-colors",
                active
                  ? "text-green-600"
                  : "text-gray-400 hover:text-gray-600"
              )}
            >
              <Icon size={22} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}