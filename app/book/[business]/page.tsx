"use client"

import { useParams } from "next/navigation"
import Calendar from "@/components/Calendar"

export default function BusinessBookingPage() {

  const params = useParams()

  const business = params.business as string

  return (
    <main className="min-h-screen flex flex-col items-center justify-start p-6 bg-gray-50">

      <h1 className="text-2xl font-semibold mb-2">
        Reservar turno
      </h1>

      <p className="text-sm text-gray-500 mb-6">
        Negocio: {business}
      </p>

      <Calendar business={business} />

    </main>
  )
}