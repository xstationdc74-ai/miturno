// app/book/page.tsx

"use client"

import Calendar from "@/components/Calendar"

export default function BookPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start p-6 bg-gray-50">
      <h1 className="text-2xl font-semibold mb-4">
        Reservar turno
      </h1>

      <p className="text-sm text-gray-500 mb-6">
        Elegí un horario disponible
      </p>

      <Calendar />
    </main>
  )
}