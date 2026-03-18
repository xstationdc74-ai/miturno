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

  useEffect(()=>{
    load()
  },[])

  const load = async () => {

    const today = new Date().toISOString().split("T")[0]

    const { data } = await supabase
      .from("sales")
      .select("amount,payment_method")
      .eq("business_id", businessId)
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

  return (

    <div className="bg-white p-4 rounded-xl border space-y-2">

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

    </div>

  )

}