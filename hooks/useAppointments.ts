"use client"

import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

type Appointment = {
  id?: string
  start_time: string
  client_name: string
}

export function useAppointments(slug: string) {

  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [hours, setHours] = useState<string[]>([])
  const [businessId, setBusinessId] = useState<string | null>(null)

  useEffect(() => {

    const loadBusiness = async () => {

      const { data } = await supabase
        .from("business")
        .select("id")
        .eq("slug", slug)
        .single()

      if (data) setBusinessId(data.id)

    }

    if (slug) loadBusiness()

  }, [slug])

  useEffect(() => {

    if (!businessId) return

    const loadHours = async () => {

      const today = new Date().getDay()
      const day = today === 0 ? 7 : today

      const { data } = await supabase
        .from("business_hours")
        .select("open_time,close_time")
        .eq("business_id", businessId)
        .eq("day_of_week", day)
        .single()

      if (!data) return

      const start = data.open_time.slice(0,5)
      const end = data.close_time.slice(0,5)

      const slots:string[] = []

      let [h,m] = start.split(":").map(Number)
      const [eh,em] = end.split(":").map(Number)

      while (h < eh || (h === eh && m < em)) {

        const hh = h.toString().padStart(2,"0")
        const mm = m.toString().padStart(2,"0")

        slots.push(`${hh}:${mm}`)

        m += 30
        if (m === 60) {
          m = 0
          h++
        }

      }

      setHours(slots)

    }

    const fetchAppointments = async () => {

      const { data } = await supabase
        .from("appointments")
        .select("id,start_time,client_name")
        .eq("business_id", businessId)

      if (data) setAppointments(data)

    }

    loadHours()
    fetchAppointments()

    const channel = supabase
      .channel("appointments-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "appointments",
          filter: `business_id=eq.${businessId}`
        },
        () => {
          fetchAppointments()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }

  }, [businessId])

  const createAppointment = async (time: string, clientName: string) => {

    if (!businessId) return

    const startTime = `2026-01-01 ${time}:00`

    await supabase
      .from("appointments")
      .insert({
        business_id: businessId,
        client_name: clientName,
        client_phone: "",
        start_time: startTime,
        status: "booked"
      })

  }

  return {
    appointments,
    hours,
    createAppointment
  }
}