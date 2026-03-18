"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"

type Product = {
  id: string
  name: string
  price: number
  stock: number
}

type OrderItem = {
  product_id: string
  name: string
  price: number
  quantity: number
}

type PaymentMethod = "cash" | "card" | "wallet"

export default function AdminRestaurant({ businessId }: { businessId: string }) {

  const [products,setProducts] = useState<Product[]>([])
  const [orderItems,setOrderItems] = useState<OrderItem[]>([])
  const [table,setTable] = useState("1")
  const [loading,setLoading] = useState(false)
  const [payment,setPayment] = useState<PaymentMethod>("cash")
  const [message,setMessage] = useState<string | null>(null)

  useEffect(()=>{
    loadProducts()
  },[])

  const loadProducts = async () => {

    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("business_id", businessId)

    setProducts(data || [])
  }

  const showMessage = (msg:string) => {
    setMessage(msg)
    setTimeout(()=>setMessage(null),2000)
  }

  const addItem = (product:Product) => {

    if(product.stock === 0){
      showMessage("Sin stock")
      return
    }

    setOrderItems(prev => {

      const existing = prev.find(p => p.product_id === product.id)

      if(existing){

        if(existing.quantity >= product.stock){
          showMessage("Stock máximo alcanzado")
          return prev
        }

        return prev.map(p =>
          p.product_id === product.id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        )
      }

      return [
        ...prev,
        {
          product_id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1
        }
      ]

    })
  }

  const total = orderItems.reduce(
    (acc,item)=> acc + item.price * item.quantity,
    0
  )

  const handleCloseOrder = async () => {

    if(orderItems.length === 0) return

    setLoading(true)

    const { data: order, error } = await supabase
      .from("orders")
      .insert({
        business_id: businessId,
        table_number: table,
        payment_method: payment
      })
      .select()
      .single()

    if (error || !order) {
      console.error("ORDER ERROR", error)
      setLoading(false)
      showMessage("Error al crear la orden")
      return
    }

    const items = orderItems.map(i => ({
      order_id: order.id,
      product_id: i.product_id,
      quantity: i.quantity,
      price: i.price
    }))

    await supabase.from("order_items").insert(items)

    await supabase.from("sales").insert({
      business_id: businessId,
      amount: total,
      payment_method: payment
    })

    // 🔥 DESCONTAR STOCK
    for (const item of orderItems) {

      const { data: product } = await supabase
        .from("products")
        .select("stock")
        .eq("id", item.product_id)
        .single()

      if (!product) continue

      const newStock = Math.max(product.stock - item.quantity, 0)

      await supabase
        .from("products")
        .update({ stock: newStock })
        .eq("id", item.product_id)
    }

    await loadProducts()

    setOrderItems([])
    setLoading(false)

    showMessage("Cuenta cerrada ✅")
  }

  return(

    <div className="max-w-3xl mx-auto p-6 space-y-6">

      {message && (
        <div className="bg-black text-white text-sm px-4 py-2 rounded-lg">
          {message}
        </div>
      )}

      <h2 className="text-xl font-semibold">
        Restaurante — Comandas
      </h2>

      <input
        value={table}
        onChange={e=>setTable(e.target.value)}
        className="border px-3 py-2 rounded-lg text-sm"
        placeholder="Mesa"
      />

      {/* PRODUCTOS */}
      <div className="grid grid-cols-2 gap-2 max-h-[50vh] overflow-y-auto">

        {[...products]
          .sort((a,b)=> b.stock - a.stock)
          .map(p=>{

            const outOfStock = p.stock === 0

            return (
              <button
                key={p.id}
                onClick={()=>addItem(p)}
                disabled={outOfStock}
                className={`p-3 rounded-lg text-sm text-left ${
                  outOfStock
                    ? "bg-red-100 opacity-60"
                    : "bg-gray-100"
                }`}
              >
                <div className="font-medium">
                  {p.name}
                </div>

                <div className="text-xs text-gray-500">
                  ${p.price}
                </div>

                <div className={`text-xs mt-1 ${
                  outOfStock
                    ? "text-red-600"
                    : "text-green-600"
                }`}>
                  {outOfStock ? "🔴 Sin stock" : `🟢 ${p.stock} disponibles`}
                </div>

              </button>
            )
        })}

      </div>

      {/* PEDIDO */}
      <div className="bg-white p-4 rounded-xl border space-y-2">

        <h3 className="text-sm font-semibold">
          Pedido
        </h3>

        {orderItems.length === 0 && (
          <div className="text-xs text-gray-400">
            Sin items
          </div>
        )}

        {orderItems.map(i=>(
          <div key={i.product_id} className="text-sm flex justify-between">
            <span>{i.name} x{i.quantity}</span>
            <span>${i.price * i.quantity}</span>
          </div>
        ))}

        <div className="border-t pt-2 flex justify-between font-semibold">
          <span>Total</span>
          <span>${total}</span>
        </div>

      </div>

      {/* MÉTODO DE PAGO */}
      <div className="space-y-2">

        <div className="text-sm font-semibold">
          Método de pago
        </div>

        <div className="grid grid-cols-3 gap-2">

          <button
            onClick={()=>setPayment("cash")}
            className={`p-3 rounded-lg text-sm ${
              payment === "cash"
                ? "bg-black text-white"
                : "bg-gray-100"
            }`}
          >
            Efectivo
          </button>

          <button
            onClick={()=>setPayment("card")}
            className={`p-3 rounded-lg text-sm ${
              payment === "card"
                ? "bg-black text-white"
                : "bg-gray-100"
            }`}
          >
            Tarjeta
          </button>

          <button
            onClick={()=>setPayment("wallet")}
            className={`p-3 rounded-lg text-sm ${
              payment === "wallet"
                ? "bg-black text-white"
                : "bg-gray-100"
            }`}
          >
            Wallet
          </button>

        </div>

      </div>

      <button
        onClick={handleCloseOrder}
        disabled={loading}
        className="w-full bg-green-600 text-white py-3 rounded-lg"
      >
        {loading ? "Procesando..." : "Cerrar cuenta"}
      </button>

    </div>

  )

}