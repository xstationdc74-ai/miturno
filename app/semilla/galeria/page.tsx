import Link from "next/link"

export default function GaleriaPage() {
  return (
    <>
      {/* NAV */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur border-b">
        <div className="max-w-5xl mx-auto px-6 py-3 flex justify-between">
          <Link href="/semilla">Semilla</Link>
          <div className="flex gap-6 text-sm">
            <Link href="/semilla">Inicio</Link>
            <Link href="/semilla/galeria">Galería</Link>
            <Link href="/semilla/reserva">Reserva</Link>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        {/* HERO */}
        <section className="relative h-[60vh]">
          <img src="/semilla/velero/hero.jpg" className="absolute w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </section>

        <section className="py-16 px-6 max-w-5xl mx-auto space-y-16">

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <img src="/semilla/velero/gallery-1.jpg" className="rounded-xl" />
            <p className="text-lg text-gray-700">
              Navegar el lago es detener el tiempo y conectar con lo esencial.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <img src="/semilla/velero/gallery-2.jpg" className="rounded-xl" />
            <p className="text-lg text-gray-700">
              Cada salida es una experiencia compartida que queda en la memoria.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <img src="/semilla/velero/gallery-3.jpg" className="rounded-xl" />
            <p className="text-lg text-gray-700">
              La Patagonia se vive distinto cuando la recorrés desde el agua.
            </p>
          </div>

          <div className="text-center">
            <Link
              href="/semilla/reserva"
              className="bg-green-500 text-white px-6 py-3 rounded-xl"
            >
              Ver disponibilidad
            </Link>
          </div>

        </section>
      </main>
    </>
  )
}