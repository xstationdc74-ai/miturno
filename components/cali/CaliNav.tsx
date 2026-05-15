"use client"

import Link from "next/link"

export default function CaliNav() {
  return (
    <div className="flex gap-6 overflow-x-auto whitespace-nowrap px-4 py-4 text-sm border-b bg-white">

      <Link href="/cali" className="font-medium shrink-0">
        Cali 🌿
      </Link>

      <Link href="/cali/mundo" className="text-gray-600 hover:text-black shrink-0">
        Mundo Cali
      </Link>

      <Link href="/cali/parcela11" className="text-gray-600 hover:text-black shrink-0">
        Parcela 11
      </Link>

      
<Link href="/cali/tienda" className="text-gray-600 hover:text-black shrink-0">
  Tienda
</Link>

      <Link href="/cali/experiencias" className="text-gray-600 hover:text-black shrink-0">
  Experiencias
</Link>

<Link href="/cali/galeria" className="text-gray-600 hover:text-black shrink-0">
  Galeria
</Link>

      <Link href="/cali/acerca" className="text-gray-600 hover:text-black shrink-0">
        Acerca de...
      </Link>

    </div>
  )
}