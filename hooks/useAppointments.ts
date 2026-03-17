import { supabase } from "@/lib/supabase/client"

export function useAppointments() {

  const createAppointment = async ({
    business_id,
    service_id,
    client_name,
    client_phone,
    start_time
  }: {
    business_id: string
    service_id: string
    client_name: string
    client_phone: string
    start_time: string
  }) => {

    // 🔹 obtener precio del servicio
    const { data: service } = await supabase
      .from("services")
      .select("price")
      .eq("id", service_id)
      .single()

    const price = service?.price ?? 0

    // 🔹 crear cliente si no existe
    const { data: existingClient } = await supabase
      .from("clients")
      .select("*")
      .eq("business_id", business_id)
      .eq("phone", client_phone)
      .maybeSingle()

    let clientId = existingClient?.id

    if (!clientId) {

      const { data: newClient } = await supabase
        .from("clients")
        .insert({
          business_id,
          name: client_name,
          phone: client_phone
        })
        .select()
        .single()

      clientId = newClient?.id
    }

    // 🔹 crear turno
    const { data, error } = await supabase
      .from("appointments")
      .insert({
        business_id,
        service_id,
        client_name,
        client_phone,
        start_time,
        status: "booked",
        price_snapshot: price
      })
      .select()
      .single()

    if (error) {
      console.error(error)
      throw error
    }

    return data
  }

  const completeAppointment = async (appointment_id: string) => {

    const { error: updateError } = await supabase
      .from("appointments")
      .update({ status: "completed" })
      .eq("id", appointment_id)

    if (updateError) {
      console.error("UPDATE ERROR", updateError)
      return
    }

    const { data: appointment } = await supabase
      .from("appointments")
      .select("*")
      .eq("id", appointment_id)
      .single()

    if (!appointment) return

    const { error: salesError } = await supabase
      .from("sales")
      .upsert(
        {
          business_id: appointment.business_id,
          appointment_id: appointment.id,
          amount: appointment.price_snapshot
        },
        { onConflict: "appointment_id" }
      )

    if (salesError) {
      console.error("SALES ERROR", salesError)
    }

  }

  return {
    createAppointment,
    completeAppointment
  }

}