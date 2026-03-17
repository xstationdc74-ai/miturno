'use client'

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"

type Product = {
  id: string
  name: string
  price: number
}

type OrderItem = {
  product_id: string
  name: string
  price: number
  quantity: number
}

export default function AdminRestaurant({ businessId }: { businessId: string }) {

  const [products,setProducts] = useState<Product[]>([])
  const [orderItems,setOrderItems] = useState<OrderItem[]>([])
  const [table,setTable] = useState("1")
  const [loading,setLoading] = useState(false)

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

  const addItem = (product:Product) => {

    setOrderItems(prev => {

      const existing = prev.find(p => p.product_id === product.id)

      if(existing){
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

    // 1. crear order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        business_id: businessId,
        table_number: table
      })
      .select()
      .single()

    // 🔥 DEFENSA (clave)
    if(orderError || !order){
      console.error("ORDER ERROR", orderError)
      setLoading(false)
      alert("Error creando la orden")
      return
    }

    // 2. items
    const items = orderItems.map(i => ({
      order_id: order.id,
      product_id: i.product_id,
      quantity: i.quantity,
      price: i.price
    }))

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(items)

    if(itemsError){
      console.error("ITEMS ERROR", itemsError)
    }

    // 3. venta
    const { error: salesError } = await supabase
      .from("sales")
      .insert({
        business_id: businessId,
        amount: total
      })

    if(salesError){
      console.error("SALES ERROR", salesError)
    }

    setOrderItems([])
    setLoading(false)

    alert("Cuenta cerrada")
  }

  return(

    <div className="max-w-3xl mx-auto p-6 space-y-6">

      <h2 className="text-xl font-semibold">
        Restaurante — Comandas
      </h2>

      {/* MESA */}
      <input
        value={table}
        onChange={e=>setTable(e.target.value)}
        className="border px-3 py-2 rounded-lg text-sm"
        placeholder="Mesa"
      />

      {/* PRODUCTOS */}
      <div className="grid grid-cols-2 gap-2">

        {products.map(p=>(
          <button
            key={p.id}
            onClick={()=>addItem(p)}
            className="bg-gray-100 p-3 rounded-lg text-sm"
          >
            {p.name} — ${p.price}
          </button>
        ))}

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

      {/* CTA */}
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