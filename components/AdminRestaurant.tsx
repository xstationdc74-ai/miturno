"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import Link from "next/link"

type Product = {
  id: string
  name: string
  price: number
  stock: number
  category: string | null
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

export default function AdminRestaurant({
  businessId,
  slug
}: {
  businessId: string
  slug: string
}) {

  const [products,setProducts] = useState<Product[]>([])
  const [orderItems,setOrderItems] = useState<any[]>([])
  const [orders,setOrders] = useState<Order[]>([])

  const [currentItems,setCurrentItems] = useState<any[]>([])
  const [table,setTable] = useState("1")
  const [loading,setLoading] = useState(false)
  const [payment,setPayment] = useState("cash")

  const [category,setCategory] = useState("bebidas")

  useEffect(()=>{
    if(!businessId) return
    loadProducts()
    loadOrders()
  },[businessId])

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
        .update({
          stock: (products.find(p=>p.id===i.product_id)?.stock || 0) - i.quantity
        })
        .eq("id", i.product_id)
    }

    setCurrentItems([])
    setLoading(false)

    loadProducts()
    loadOrders()
  }

  const filteredProducts = products.filter(p => p.category === category)

  return(

    <div className="space-y-6">

      {slug && (
        <Link
          href={`/resto/${slug}/stock`}
          className="block text-center bg-green-600 text-white py-3 rounded-lg text-sm"
        >
          Gestionar stock
        </Link>
      )}

      {/* CATEGORÍAS */}
      <div className="flex gap-3 overflow-x-auto pb-2">

        {[
          { key: "bebidas", label: "🍺 Bebidas" },
          { key: "platos", label: "🍝 Platos" },
          { key: "postres", label: "🍰 Postres" }
        ].map(c => (

          <button
            key={c.key}
            onClick={()=>setCategory(c.key)}
            className={`
              px-5 py-3 rounded-xl text-sm whitespace-nowrap font-medium transition
              ${category === c.key
                ? "bg-green-600 text-white shadow"
                : "bg-gray-100 active:scale-95"}
            `}
          >
            {c.label}
          </button>

        ))}

      </div>

      {/* PRODUCTOS */}
      <div className="grid grid-cols-2 gap-3">

        {filteredProducts.map(p => {

          const noStock = p.stock === 0

          return (
            <button
              key={p.id}
              onClick={() => addItem(p)}
              disabled={noStock}
              className={`
                p-4 rounded-xl text-left transition transform
                ${noStock
                  ? "bg-gray-200 text-gray-400"
                  : "bg-white active:scale-95 shadow-sm"}
              `}
            >

              <div className="text-base font-semibold">
                {p.name}
              </div>

              <div className="text-sm text-gray-500">
                ${p.price}
              </div>

              <div className="text-[10px] text-green-500 mt-1 opacity-70">
                tap para agregar
              </div>

              <div className={`text-xs mt-1 ${
                noStock
                  ? "text-red-500"
                  : p.stock <= 2
                    ? "text-yellow-600"
                    : "text-green-600"
              }`}>
                {noStock ? "Sin stock" : `Stock: ${p.stock}`}
              </div>

            </button>
          )
        })}

      </div>

      {/* PEDIDO EDITABLE */}
      <div className="bg-white p-4 rounded-xl border space-y-3">

        <h3 className="text-sm font-semibold">
          Pedido actual
        </h3>

        {currentItems.length === 0 && (
          <div className="text-sm text-gray-400">
            Sin productos
          </div>
        )}

        {currentItems.map(i=>(
          <div key={i.product_id} className="flex justify-between items-center text-sm">

            <div>
              <div className="font-medium">{i.name}</div>
              <div className="text-xs text-gray-500">${i.price} c/u</div>
            </div>

            <div className="flex items-center gap-2">

              <button
                onClick={()=>{
                  setCurrentItems(prev =>
                    prev
                      .map(p =>
                        p.product_id === i.product_id
                          ? { ...p, quantity: p.quantity - 1 }
                          : p
                      )
                      .filter(p => p.quantity > 0)
                  )
                }}
                className="bg-gray-200 px-2 py-1 rounded"
              >
                -
              </button>

              <span className="w-6 text-center">
                {i.quantity}
              </span>

              <button
                onClick={()=>{
                  setCurrentItems(prev =>
                    prev.map(p =>
                      p.product_id === i.product_id
                        ? { ...p, quantity: p.quantity + 1 }
                        : p
                    )
                  )
                }}
                className="bg-gray-200 px-2 py-1 rounded"
              >
                +
              </button>

              <button
                onClick={()=>{
                  setCurrentItems(prev =>
                    prev.filter(p => p.product_id !== i.product_id)
                  )
                }}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                x
              </button>

            </div>

          </div>
        ))}

        <div className="border-t pt-2 flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>${total}</span>
        </div>

      </div>

      <button
        onClick={handleCloseOrder}
        disabled={loading}
        className="w-full bg-green-600 text-white py-4 rounded-xl text-lg font-semibold active:scale-95"
      >
        {loading ? "Procesando..." : "Cerrar cuenta"}
      </button>

      {/* HISTORIAL */}
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