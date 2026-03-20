"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import Link from "next/link"

type Product = {
  id: string
  name: string
  price: number
  stock: number
}

type Order = {
  id: string
  table_number: string
  payment_method: string
  created_at: string
}

type OrderItem = {
  id: string
  order_id: string
  product_id: string
  quantity: number
  price: number
  products: {
    name: string
  }
}

export default function AdminRestaurant({ businessId }: { businessId: string }) {

  const [products,setProducts] = useState<Product[]>([])
  const [orderItems,setOrderItems] = useState<any[]>([])
  const [orders,setOrders] = useState<Order[]>([])

  const [currentItems,setCurrentItems] = useState<any[]>([])
  const [table,setTable] = useState("1")
  const [loading,setLoading] = useState(false)
  const [payment,setPayment] = useState("cash")

  useEffect(()=>{
    loadProducts()
    loadOrders()
  },[])

  const loadProducts = async () => {

    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("business_id", businessId)

    setProducts(data || [])
  }

  const loadOrders = async () => {

    const { data } = await supabase
      .from("orders")
      .select("*")
      .eq("business_id", businessId)
      .order("created_at",{ ascending:false })

    setOrders(data || [])

    const { data: items } = await supabase
      .from("order_items")
      .select("*, products(name)")
    
    setOrderItems(items || [])
  }

  const addItem = (product:Product) => {

    if(product.stock === 0) return

    setCurrentItems(prev => {

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

  const total = currentItems.reduce(
    (acc,item)=> acc + item.price * item.quantity,
    0
  )

  const handleCloseOrder = async () => {

    if(currentItems.length === 0) return

    setLoading(true)

    const { data: order } = await supabase
      .from("orders")
      .insert({
        business_id: businessId,
        table_number: table,
        payment_method: payment
      })
      .select()
      .single()

    const items = currentItems.map(i => ({
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

    for (const i of currentItems) {
      await supabase
        .from("products")
        .update({ stock: (products.find(p=>p.id===i.product_id)?.stock || 0) - i.quantity })
        .eq("id", i.product_id)
    }

    setCurrentItems([])
    setLoading(false)

    loadProducts()
    loadOrders()
  }

  return(

    <div className="space-y-6">

      <Link
        href={`/resto/${businessId}/stock`}
        className="block text-center bg-green-600 text-white py-3 rounded-lg text-sm"
      >
        Gestionar stock
      </Link>

      {/* PRODUCTOS */}
      <div className="grid grid-cols-2 gap-2">

        {products.map(p=>(
          <button
            key={p.id}
            onClick={()=>addItem(p)}
            className="bg-gray-100 p-3 rounded-lg text-sm"
          >
            {p.name} — ${p.price}
            <div className="text-xs text-gray-500">
              Stock: {p.stock}
            </div>
          </button>
        ))}

      </div>

      {/* PEDIDO ACTUAL */}
      <div className="bg-white p-4 rounded-xl border space-y-2">

        <h3 className="text-sm font-semibold">
          Pedido actual
        </h3>

        {currentItems.map(i=>(
          <div key={i.product_id} className="flex justify-between text-sm">
            <span>{i.name} x{i.quantity}</span>
            <span>${i.price * i.quantity}</span>
          </div>
        ))}

        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>${total}</span>
        </div>

      </div>

      <button
        onClick={handleCloseOrder}
        disabled={loading}
        className="w-full bg-green-600 text-white py-3 rounded-lg"
      >
        Cerrar cuenta
      </button>

      {/* 🔥 HISTORIAL */}
      <div className="bg-white p-4 rounded-xl border space-y-3">

        <h3 className="text-sm font-semibold">
          Historial de comandas
        </h3>

        {orders.map(o=>{

          const items = orderItems.filter(i=>i.order_id === o.id)

          return (
            <div key={o.id} className="border rounded-lg p-3 text-sm space-y-1">

              <div className="font-medium">
                Mesa {o.table_number}
              </div>

              <div className="text-xs text-gray-500">
                {o.payment_method}
              </div>

              {items.map(i=>(
                <div key={i.id} className="flex justify-between text-xs">
                  <span>{i.products?.name} x{i.quantity}</span>
                  <span>${i.price * i.quantity}</span>
                </div>
              ))}

            </div>
          )
        })}

      </div>

    </div>

  )

}