"use client"

import { useEffect, useState } from "react"

export default function SplashScreen({
  children,
  logo = "/logo-kume.png",
  title = "Kume",
}: {
  children: React.ReactNode
  logo?: string
  title?: string
}) {

  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {

    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 1500)

    return () => clearTimeout(timer)

  }, [])

  if (showSplash) {

    return (

      <div className="flex flex-col items-center justify-center h-screen bg-white">

      <img
         src={logo}
    className="w-48 md:w-72 animate-fade-in"
      />

      

    </div>

    )

  }

  return <>{children}</>
}