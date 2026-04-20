"use client"

import { useState, useEffect } from "react"
import IshyaSplash from "@/components/ishya/IshyaSplash"
import "../ishya.css"

const horariosMock = [
  { hora: "10:00", disponible: true },
  { hora: "11:00", disponible: false },
  { hora: "12:00", disponible: true },
  { hora: "16:00", disponible: true },
]

export default function ReservaPage() {
  const [loading, setLoading] = useState(true)

  const [dia, setDia] = useState<string | null>(null)
  const [hora, setHora] = useState<string | null>(null)
  const [nombre, setNombre] = useState("")
  const [telefono, setTelefono] = useState("")

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

        {/* TITULO */}
        <h1 className="script text-3xl md:text-4xl text-[#5E5A57] mb-6">
          Elegí tu momento de bienestar
        </h1>

        {/* SEPARADOR */}
        <img
          src="/ishya/pies.png"
          className="w-40 mb-10 opacity-80"
        />

        {/* CONTENEDOR */}
        <div className="w-full max-w-sm space-y-6">

          {/* DÍAS */}
          <div className="bg-white/70 backdrop-blur rounded-2xl p-5 shadow-md">
            <h3 className="title text-lg mb-3">Seleccionar día</h3>

            <div className="flex gap-2 justify-center">
              {["Hoy", "Mañana", "Viernes"].map((d) => (
                <button
                  key={d}
                  onClick={() => setDia(d)}
                  className={`px-4 py-2 rounded-full text-sm ${
                    dia === d
                      ? "bg-[#A3B18A] text-white"
                      : "bg-white text-gray-600"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* HORARIOS */}
          {dia && (
            <div className="bg-white/70 backdrop-blur rounded-2xl p-5 shadow-md">
              <h3 className="title text-lg mb-3">Seleccionar horario</h3>

              <div className="grid grid-cols-3 gap-2">
                {horariosMock.map((h) => (
                  <button
                    key={h.hora}
                    disabled={!h.disponible}
                    onClick={() => setHora(h.hora)}
                    className={`py-2 rounded-lg text-sm ${
                      h.disponible
                        ? hora === h.hora
                          ? "bg-[#A3B18A] text-white"
                          : "bg-white"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {h.hora}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* FORM */}
          {hora && (
            <div className="bg-white/70 backdrop-blur rounded-2xl p-5 shadow-md space-y-4">

              <h3 className="title text-lg">Tus datos</h3>

              <input
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-white text-sm outline-none"
              />

              <input
                placeholder="Teléfono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-white text-sm outline-none"
              />

              <button className="w-full bg-[#A3B18A] text-white py-3 rounded-full text-sm">
                Confirmar reserva
              </button>

            </div>
          )}

        </div>

      </div>
    </main>
  )
}