// hooks/useAppointments.ts

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

const BUSINESS_ID = "df7a446d-13f5-42a6-a913-c257e87b01ef"
const SERVICE_ID = "00000000-0000-0000-0000-000000000001"

export function useAppointments() {

  const [appointments, setAppointments] = useState<Appointment[]>([])

  const fetchAppointments = async () => {

    const { data, error } = await supabase
      .from("appointments")
      .select("id,start_time,client_name")
      .order("start_time")

    console.log("FETCH", data, error)

    if (data) setAppointments(data)
  }

  const createAppointment = async (time: string, clientName: string) => {

    const startTime = `2026-01-01 ${time}:00`

    const { data, error } = await supabase
      .from("appointments")
      .insert({
        business_id: BUSINESS_ID,
        service_id: SERVICE_ID,
        client_name: clientName,
        client_phone: "",
        start_time: startTime,
        status: "booked"
      })
      .select()

    console.log("INSERT RESULT", data, error)
  }

  useEffect(() => {

    fetchAppointments()

    const channel = supabase
      .channel("appointments-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "appointments"
        },
        () => {
          console.log("REALTIME EVENT")
          fetchAppointments()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }

  }, [])

  return {
    appointments,
    createAppointment
  }
}