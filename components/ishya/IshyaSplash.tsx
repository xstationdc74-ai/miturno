"use client"

import { useEffect, useState } from "react"

export default function IshyaSplash() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">

      {/* BACKGROUND */}
      <img
        src="/ishya/bg.png"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* OVERLAY SUAVE */}
      <div className="absolute inset-0 bg-white/50 backdrop-blur-sm" />

      {/* LOGO */}
      <img
        src="/ishya/logo.png"
        alt="Ishya"
        className="relative z-10 w-32 opacity-90 animate-fade"
      />
    </div>
  )
}