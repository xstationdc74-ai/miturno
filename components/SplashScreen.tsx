"use client"

export default function SplashScreen() {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">

      <div className="text-center">

        <img
          src="/logo-kume.png"
          alt="Kume"
          className="w-72 mx-auto animate-pulse"
        />

        

      </div>

    </div>
  )
}