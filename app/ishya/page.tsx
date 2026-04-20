"use client"

import { useState, useEffect } from "react"
import IshyaSplash from "@/components/ishya/IshyaSplash"
import "./ishya.css"
import { useRouter } from "next/navigation"

export default function IshyaPage() {
  const router = useRouter()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (loading) return <IshyaSplash />

  return (
    <main className="min-h-screen relative overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <img
          src="/ishya/bg.png"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-20 pb-16">

        {/* LOGO */}
        <img
          src="/ishya/logo.png"
          className="w-24 mb-4 opacity-90"
        />

        {/* FRASE */}
        <h1 className="script text-3xl md:text-4xl mb-6">
          Tu momento empieza hoy
        </h1>

        {/* SEPARADOR */}
        <img
          src="/ishya/pies.png"
          className="w-40 mb-10 opacity-80"
        />

        {/* SERVICIOS */}
        <div className="w-full max-w-sm space-y-5">

          {/* REFLEXOLOGIA */}
          <div className="bg-white/70 backdrop-blur rounded-2xl p-5 shadow-md">
            <h3 className="title text-xl text-[#4E4A47] mb-1">
              Reflexología
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Equilibrio a través de los puntos del cuerpo
            </p>
            <button
              onClick={() => router.push("/ishya/reserva")}
              className="bg-[#A3B18A] text-white px-6 py-2 rounded-full text-sm"
            >
              Reservar
            </button>
          </div>

          {/* MASAJES */}
          <div className="bg-white/70 backdrop-blur rounded-2xl p-5 shadow-md">
            <h3 className="title text-xl text-[#4E4A47] mb-1">
              Masajes
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Liberación de tensiones y descanso físico
            </p>
            <button
              onClick={() => router.push("/ishya/reserva")}
              className="bg-[#A3B18A] text-white px-6 py-2 rounded-full text-sm"
            >
              Reservar
            </button>
          </div>

          {/* AROMATERAPIA */}
          <div className="bg-white/70 backdrop-blur rounded-2xl p-5 shadow-md">
            <h3 className="title text-xl text-[#4E4A47] mb-1">
              Aromaterapia
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Relajación profunda con aceites esenciales
            </p>
            <button
              onClick={() => router.push("/ishya/reserva")}
              className="bg-[#A3B18A] text-white px-6 py-2 rounded-full text-sm"
            >
              Reservar
            </button>
          </div>

          {/* OCCIPUCIO */}
          <div className="bg-white/70 backdrop-blur rounded-2xl p-5 shadow-md">
            <h3 className="title text-xl text-[#4E4A47] mb-1">
              Occipucio
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Trabajo profundo sobre estrés y sistema nervioso
            </p>
            <button
              onClick={() => router.push("/ishya/reserva")}
              className="bg-[#A3B18A] text-white px-6 py-2 rounded-full text-sm"
            >
              Reservar
            </button>
          </div>

        </div>

      </div>
    </main>
  )
}