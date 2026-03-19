"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import CashSummary from "@/components/CashSummary"
import Link from "next/link"

type Appointment = {
  id: string
  client_name: string
  client_phone: string
  status: string
}

type Business = {
  id: string
  name: string
  slug: string
}

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {

  const [slug,setSlug] = useState<string | null>(null)
  const [biz,setBiz] = useState<Business | null>(null)
  const [appointments,setAppointments] = useState<Appointment[]>([])

  useEffect(()=>{
    const loadParams = async () => {
      const p = await params
      setSlug(p.slug)
    }
    loadParams()
  },[params])

  useEffect(()=>{
    if(!slug) return
    loadData()
  },[slug])

  const loadData = async () => {

    const { data: bizData } = await supabase
      .from("business")
      .select("*")
      .eq("slug", slug)
      .single()

    if(!bizData) return

    setBiz(bizData)

    const { data: appData } = await supabase
      .from("appointments")
      .select("*")
      .eq("business_id", bizData.id)
      .order("created_at", { ascending: false })

    setAppointments(appData || [])
  }

  const updateStatus = async (id:string, status:string) => {

    await supabase
      .from("appointments")
      .update({ status })
      .eq("id", id)

    setAppointments(prev =>
      prev.map(a =>
        a.id === id ? { ...a, status } : a
      )
    )
  }

  if (!biz) return <div className="p-10">Cargando...</div>

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">

      <h1 className="text-2xl font-semibold">
        {biz.name}
      </h1>

      {/* 🔥 BOTONES LARGOS */}
      <div className="space-y-2">

        <Link
          href={`/resto/${biz.slug}/stock`}
          className="block text-center bg-green-600 text-white py-3 rounded-lg text-sm"
        >
          Gestionar stock
        </Link>

        <Link
          href={`/resto/${biz.slug}`}
          className="block text-center bg-green-600 text-white py-3 rounded-lg text-sm"
        >
          Ver comandas
        </Link>

      </div>

      {/* RESERVAS */}
      <div className="bg-white p-4 rounded-xl border space-y-3">

        <h2 className="text-sm font-semibold">
          Reservas
        </h2>

        {appointments.length === 0 && (
          <div className="text-xs text-gray-400">
            Sin reservas
          </div>
        )}

        {appointments.map(a => (
          <div
            key={a.id}
            className="border rounded-lg p-3 space-y-2 text-sm"
          >

            <div className="font-medium">
              {a.client_name}
            </div>

            <div className="text-xs text-gray-500">
              {a.client_phone}
            </div>

            <div className="text-xs">
              Estado: {a.status}
            </div>

            <div className="flex gap-2">

              <button
                onClick={()=>updateStatus(a.id,"accepted")}
                className="px-3 py-1 text-xs bg-green-600 text-white rounded"
              >
                Aceptar
              </button>

              <button
                onClick={()=>updateStatus(a.id,"rejected")}
                className="px-3 py-1 text-xs bg-red-600 text-white rounded"
              >
                Rechazar
              </button>

            </div>

          </div>
        ))}

      </div>

      <CashSummary businessId={biz.id} />

    </div>
  )
}