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
  const [businessId, setBusinessId] = useState<string | null>(null)

  useEffect(() => {

    const loadBusiness = async () => {

      const { data } = await supabase
        .from("business")
        .select("id")
        .eq("slug", slug)
        .single()

      if (data) {
        setBusinessId(data.id)
      }

    }

    if (slug) loadBusiness()

  }, [slug])

  useEffect(() => {

    if (!businessId) return

    const fetchAppointments = async () => {

      const { data } = await supabase
        .from("appointments")
        .select("id,start_time,client_name")
        .eq("business_id", businessId)
        .order("start_time")

      if (data) setAppointments(data)

    }

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
    createAppointment
  }
}