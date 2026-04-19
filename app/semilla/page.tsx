"use client"

import Link from "next/link"

export default function SemillaPage() {
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
        <section className="relative h-[90vh] w-full">
          <img
            src="/semilla/velero/hero.jpg"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/40" />

          <div className="relative z-10 flex h-full items-center justify-center text-center px-6">
            <div className="max-w-2xl text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Tu negocio, funcionando así de simple
              </h1>

              <p className="text-lg md:text-xl">
                Reservas, contacto y experiencia en un solo lugar
              </p>
            </div>
          </div>
        </section>

        {/* EXPERIENCIA */}
        <section className="py-20 px-6 bg-white">
          <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">

            {/* RESERVA */}
            <div className="p-6 border rounded-xl text-center flex flex-col items-center">
              
              <h3 className="font-semibold text-xl mb-2">Reserva</h3>

              <p className="text-gray-600 mb-4">
                Elegí tu horario y organizá la experiencia
              </p>

              <img
                src="/shared/icono-reserva.png"
                className="w-16 h-16 mb-6 object-contain"
              />

              <div className="mt-auto">
                <Link
                  href="/semilla/reserva"
                  className="bg-green-500 text-white px-5 py-2 rounded-lg text-sm"
                >
                  Ver horarios
                </Link>
              </div>
            </div>

            {/* GALERÍA */}
            <div className="p-6 border rounded-xl text-center flex flex-col items-center">
              
              <h3 className="font-semibold text-xl mb-2">Galería</h3>

              <p className="text-gray-600 mb-4">
                Momentos reales en el lago
              </p>

              <Link href="/semilla/galeria" className="mb-6 w-full flex justify-center">
                <img
                  src="/semilla/velero/gallery-1.jpg"
                  className="rounded-lg object-cover h-28 w-4/5"
                />
              </Link>

              <div className="mt-auto">
                <Link
                  href="/semilla/galeria"
                  className="bg-green-500 text-white px-5 py-2 rounded-lg text-sm"
                >
                  Ver galería
                </Link>
              </div>
            </div>

            {/* CONSULTA */}
            <div className="p-6 border rounded-xl text-center flex flex-col items-center">
              
              <h3 className="font-semibold text-xl mb-2">Consulta</h3>

              <p className="text-gray-600 mb-4">
                Coordiná tu salida personalizada
              </p>

              <img
                src="/shared/icono-consulta.png"
                className="w-16 h-16 mb-6 object-contain"
              />

              <div className="mt-auto">
                <a
                  href="https://wa.me/5491134490093?text=Hola!%20Quiero%20consultar%20sobre%20el%20paseo%20en%20velero%20para%20mi%20familia"
                  target="_blank"
                  className="bg-green-500 text-white px-5 py-2 rounded-lg text-sm"
                >
                  Consultar
                </a>
              </div>
            </div>

          </div>
        </section>
      </main>
    </>
  )
}