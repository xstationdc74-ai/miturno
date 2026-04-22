"use client"

import "../ishya.css"

export default function GraciasPage() {
  return (
    <main className="min-h-screen relative overflow-hidden flex items-center justify-center">

      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <img
          src="/ishya/bg.png"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 text-center px-6 max-w-sm">

        {/* LOGO */}
        <img
          src="/ishya/logo.png"
          className="w-24 mb-6 mx-auto opacity-90"
        />

        {/* MENSAJE */}
        <h1 className="script text-3xl text-[#5E5A57] mb-4">
  Estamos preparando tu momento ✨
</h1>

<p className="title text-sm text-gray-600 mb-8 leading-relaxed">
  En breve vas a recibir la confirmación de tu turno por WhatsApp.
</p>
        {/* BOTÓN VOLVER */}
        <button
          onClick={() => {
            window.location.href = "/ishya"
          }}
          className="w-full bg-[#A3B18A] text-white py-3 rounded-full text-sm"
        >
          Volver al inicio
        </button>

      </div>
    </main>
  )
}