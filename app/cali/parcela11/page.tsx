"use client"

import CaliNav from "@/components/cali/CaliNav"
import Link from "next/link"

export default function CaliEspacio() {

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* 🌿 NAV */}
      <CaliNav />

      {/* 🌿 HERO (flyer completo) */}
      <div className="max-w-6xl mx-auto px-6 py-16">

  <div className="grid md:grid-cols-2 gap-10 items-center">

    {/* 🌿 IMAGEN */}
    <img
  src="/parcela11.png"
  className="w-full h-full object-contain rounded-xl bg-white"
/>

    {/* 🌿 TEXTO */}
    <div className="space-y-6 text-center md:text-left">

      <h1 className="text-3xl md:text-4xl font-serif italic text-[#7FA6C9]">
        Parcela 11
      </h1>

      <p className="text-gray-600 leading-relaxed">
        Un espacio vivo dentro de Eco Huertas donde el bosque se transforma en experiencia.
      </p>

      <p className="text-gray-600 leading-relaxed">
        Caminos que invitan a detenerse, observar y conectar con los procesos naturales.
      </p>

      <p className="text-gray-600 leading-relaxed">
        Un lugar para experimentar con tintas, fibras y tiempo.
      </p>

    </div>

  </div>

</div>
      {/* 🌿 TEXTO */}
      <div className="max-w-3xl mx-auto px-6 py-16 space-y-6 text-center">

        <p className="text-[#7FA6C9] text-lg font-serif italic">
          Vivero & Taller de Tintas del Bosque
        </p>

        <p className="text-gray-600 leading-relaxed">
          Un espacio donde la naturaleza y el arte se encuentran para dar vida a procesos creativos únicos.
        </p>

        <p className="text-gray-600 leading-relaxed">
          Caminos, tintas y fibras que nacen del bosque y se transforman en experiencias.
        </p>

      </div>

      {/* 🌿 INFO */}
      <div className="max-w-xl mx-auto px-6 pb-16 text-center space-y-4">

        <div className="text-gray-600 text-sm">
          📍 Parcela 11 · Eco Huertas · Villa La Angostura
        </div>

        <div className="text-gray-600 text-sm">
          🌿 Espacio de talleres y experimentación
        </div>

      </div>

      {/* 🌿 CTA */}
      <div className="text-center pb-20">

        <Link
          href="/cali/mundo"
          className="inline-block px-6 py-3 rounded-full text-sm bg-[#7FA6C9] hover:bg-[#6B93B5] text-white transition"
        >
          Ver experiencias en este espacio
        </Link>

      </div>

      {/* 🌿 FOOTER */}
      <div className="border-t py-10 text-center space-y-4 mt-10">

        <p className="text-sm text-gray-500">
          ¿Te gustaría una app para vos?
        </p>

        <a
          href="https://wa.me/5491134490093text=Hola!%20👋%20Vi%20Cali%20y%20me%20encantó.%20Quisiera%20una%20app%20para%20mi%20proyecto."
          target="_blank"
          className="inline-block text-sm underline text-gray-700"
        >
          Escribinos por WhatsApp
        </a>

      </div>

    </div>
  )
}