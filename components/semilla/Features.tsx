
"use client"
import { useState } from "react"

export default function Features() {
  const [active, setActive] = useState<number | null>(null)

  const items = [
    {
      icon: "🌱",
      title: "A medida",
      desc: "Soluciones adaptadas a cada negocio",
    },
    {
      icon: "⚡",
      title: "Fácil de usar",
      desc: "Simple desde el primer día",
    },
    {
      icon: "📈",
      title: "Escalable",
      desc: "Crece junto a tu negocio",
    },
    {
      icon: "💛",
      title: "Con alma",
      desc: "Pensado para personas reales",
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mt-10">
      {items.map((item, i) => (
        <div
          key={i}
          onClick={() => setActive(active === i ? null : i)}
          className="space-y-2 cursor-pointer"
        >
          <div className="text-2xl">{item.icon}</div>
          <div className="font-medium">{item.title}</div>

          {active === i && (
            <div className="text-sm text-gray-600 mt-2">
              {item.desc}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
