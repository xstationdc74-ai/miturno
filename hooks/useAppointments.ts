"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export function useAppointments() {

  const [appointments, setAppointments] = useState<any[]>([]);

  async function loadAppointments() {

    const { data, error } = await supabase
      .from("appointments")
      .select("*");

    if (error) {
      console.log("SUPABASE ERROR:", error);
    }

    setAppointments(data || []);
  }

  async function createAppointment(time: string) {

    const today = new Date().toISOString().split("T")[0];

    const start_time = `${today} ${time}:00`;

    const { error } = await supabase
      .from("appointments")
      .insert({
        client_name: "Nuevo Cliente",
        start_time,
        status: "booked"
      });

    if (error) {
      console.log("INSERT ERROR:", error);
    }

    await loadAppointments();
  }

  useEffect(() => {
    loadAppointments();
  }, []);

  return { appointments, createAppointment };
}