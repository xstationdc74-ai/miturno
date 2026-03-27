"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"

type Summary = {
  cash: number
  card: number
  wallet: number
}

export default function CashSummary({ businessId }: { businessId: string }) {

  const [summary,setSummary] = useState<Summary>({
    cash: 0,
    card: 0,
    wallet: 0
  })

  const [loading,setLoading] = useState(false)

  useEffect(()=>{
    if(!businessId) return
    load()
  },[businessId])

  const load = async () => {

    const today = new Date().toISOString().split("T")[0]

    const { data } = await supabase
      .from("sales")
      .select("amount,payment_method")
      .eq("business_id", businessId)
      .eq("closed", false)
      .gte("created_at", `${today}T00:00:00`)
      .lte("created_at", `${today}T23:59:59`)

    let cash = 0
    let card = 0
    let wallet = 0

    data?.forEach(s => {
      if(s.payment_method === "cash") cash += s.amount
      if(s.payment_method === "card") card += s.amount
      if(s.payment_method === "wallet") wallet += s.amount
    })

    setSummary({ cash, card, wallet })
  }

  const total = summary.cash + summary.card + summary.wallet

  const handleCloseDay = async () => {

    if(total === 0){
      alert("No hay ventas para cerrar")
      return
    }

    const ok = confirm("¿Cerrar caja del día?")
    if(!ok) return

    setLoading(true)

    await supabase
      .from("cash_closings")
      .insert({
        business_id: businessId,
        total: total
      })

    await supabase
      .from("sales")
      .update({ closed: true })
      .eq("business_id", businessId)
      .or("closed.is.null,closed.eq.false")

    alert("Caja cerrada ✅")

    await load()

    setLoading(false)
  }

  return (

    <div className="bg-white p-4 rounded-xl border space-y-3">

      <div className="font-semibold">
        Caja del día
      </div>

      <div className="text-sm flex justify-between">
        <span>Efectivo</span>
        <span>${summary.cash}</span>
      </div>

      <div className="text-sm flex justify-between">
        <span>Tarjeta</span>
        <span>${summary.card}</span>
      </div>

      <div className="text-sm flex justify-between">
        <span>Wallet</span>
        <span>${summary.wallet}</span>
      </div>

      <div className="border-t pt-2 flex justify-between font-semibold">
        <span>Total</span>
        <span>${total}</span>
      </div>

      <button
        onClick={handleCloseDay}
        disabled={loading}
        className="w-full bg-black text-white py-2 rounded-lg text-sm"
      >
        {loading ? "Cerrando..." : "Cerrar caja"}
      </button>

    </div>

  )

}