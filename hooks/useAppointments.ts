"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export function useAppointments() {

  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {

    async function loadAppointments() {

      const { data, error } = await supabase
        .from("appointments")
        .select("*");

      if (error) {
        console.log("SUPABASE ERROR:", error);
      }

      console.log("SUPABASE DATA:", data);

      setAppointments(data || []);
    }

    loadAppointments();

  }, []);

  return appointments;
}