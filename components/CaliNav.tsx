"use client"

import Link from "next/link"

export default function CaliNav() {
  return (
    <div className="flex justify-center gap-6 py-4 text-sm border-b bg-white">

      <Link href="/cali" className="font-medium">
        Cali 🌿
      </Link>

      <Link href="/cali/mundo" className="text-gray-600 hover:text-black">
        Mundo
      </Link>

      <Link href="/cali/galeria" className="text-gray-600 hover:text-black">
        Galería
      </Link>

      <Link href="/cali/talleres" className="text-gray-600 hover:text-black">
        Talleres
      </Link>

      <Link href="/cali/eventos" className="text-gray-600 hover:text-black">
        Eventos
      </Link>

    </div>
  )
}