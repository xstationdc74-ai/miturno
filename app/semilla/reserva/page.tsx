"use client"

import Link from "next/link"
import { useState } from "react"

export default function ReservaPage() {
  const [hora, setHora] = useState("")
  const [nombre, setNombre] = useState("")
  const [personas, setPersonas] = useState("")

  const link = `https://wa.me/549XXXXXXXXXX?text=${encodeURIComponent(
    `Hola! Soy ${nombre}, quiero reservar el horario ${hora} hs para ${personas} personas`
  )}`

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

        <section className="py-16 px-6 max-w-3xl mx-auto">

          <h1 className="text-3xl font-bold mb-6">
            Paseo en velero
          </h1>

          <div className="grid grid-cols-2 gap-4 mb-8">
            {["09:00", "11:00", "13:00", "15:00"].map((h) => (
              <button
                key={h}
                onClick={() => setHora(h)}
                className={`border py-3 rounded-lg ${
                  hora === h ? "bg-green-500 text-white" : ""
                }`}
              >
                {h} hs
              </button>
            ))}
          </div>

          {hora && (
            <div className="space-y-4">
              <input
                placeholder="Tu nombre"
                className="w-full border p-3 rounded-lg"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />

              <input
                placeholder="Cantidad de personas"
                className="w-full border p-3 rounded-lg"
                value={personas}
                onChange={(e) => setPersonas(e.target.value)}
              />

              <a
                href={link}
                target="_blank"
                className="block text-center bg-green-500 text-white py-3 rounded-xl"
              >
                Confirmar por WhatsApp
              </a>
            </div>
          )}

        </section>
      </main>
    </>
  )
}