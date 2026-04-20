import Link from "next/link"

export default function IshyaNav() {
  return (
    <nav className="fixed top-0 left-0 w-full z-40 bg-black text-white border-b border-yellow-600">
      <div className="max-w-5xl mx-auto px-6 py-3 flex justify-between items-center">
        
        <Link href="/ishya" className="font-semibold text-yellow-400">
          Ishya
        </Link>

        <div className="flex gap-6 text-sm">
          <a href="#servicios">Servicios</a>
          <a href="#reservar">Reservar</a>
        </div>

      </div>
    </nav>
  )
}