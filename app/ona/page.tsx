"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { getUserBusinessRole } from "@/lib/auth"
import OnaSplash from "@/components/ona/OnaSplash"

const DEFAULT_SLUG = "ona"

async function generateTasksIfNeeded(businessId: string) {
  const today = new Date()
  const day = today.getDay()

  // 🔍 verificar si ya hay tareas hoy
  const start = new Date()
  start.setHours(0,0,0,0)

  const end = new Date()
  end.setHours(23,59,59,999)

  const { data: existing } = await supabase
    .from("tasks")
    .select("id")
    .eq("business_id", businessId)
    .gte("created_at", start.toISOString())
    .lte("created_at", end.toISOString())

  if (existing && existing.length > 0) return

  // 🔥 traer templates
  const { data: templates } = await supabase
    .from("task_templates")
    .select("*")
    .eq("business_id", businessId)
    .eq("active", true)

  if (!templates) return

  const todaysTemplates = templates.filter(t =>
    t.days_of_week.includes(day)
  )

  for (const t of todaysTemplates) {
    await supabase.from("tasks").insert({
      business_id: businessId,
      title: t.title,
      description: t.description,
      type: t.type
    })
  }
}

export default function Page() {

  const [slug,setSlug] = useState<string | null>(null)
  const [tasks,setTasks] = useState<any[]>([])
  const [user,setUser] = useState<any>(null)
  const [businessId,setBusinessId] = useState<string | null>(null)
  const [products,setProducts] = useState<any[]>([])

  const [showSplash,setShowSplash] = useState(true)

  const [showStockModal,setShowStockModal] = useState(false)
  const [activeTask,setActiveTask] = useState<any>(null)
  const [stockInputs,setStockInputs] = useState<Record<string, number>>({})
  const [comment,setComment] = useState("")

  useEffect(()=>{
    setSlug(DEFAULT_SLUG)
  },[])

  useEffect(()=>{
    const init = async () => {
      if (!slug) return

      const { user, role, business } = await getUserBusinessRole(slug)

if (!user) {
  window.location.href = "/login"
  return
}

if (!business) {
  window.location.href = "/login"
  return
}

      setUser(user)
      setBusinessId(business.id)

      await generateTasksIfNeeded(business.id)

      loadTasks(user.id, business.id)
      loadProducts(business.id)
    }

    init()
  },[slug])

  const loadProducts = async (businessId:string) => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("business_id", businessId)

    setProducts(data || [])
  }

  const loadTasks = async (userId:string, businessId:string) => {

    const { data: assignments } = await supabase
      .from("task_assignments")
      .select("*")
      .eq("user_id", userId)
      .eq("business_id", businessId)

    if (!assignments) {
      setTasks([])
      return
    }

    const activeAssignments = assignments.filter(
      a => a.status === "pending" || a.status === "accepted"
    )

    if (activeAssignments.length === 0) {
      setTasks([])
      return
    }

    const taskIds = activeAssignments.map(a => a.task_id)

    const { data: tasksData } = await supabase
      .from("tasks")
      .select("*")
      .in("id", taskIds)

    const merged = activeAssignments.map(a => ({
      ...a,
      task: tasksData?.find(t => t.id === a.task_id)
    }))

    setTasks(merged)
  }

  const acceptTask = async (id:string) => {

    const { data: activeTasks } = await supabase
      .from("task_assignments")
      .select("*")
      .eq("user_id", user.id)
      .eq("business_id", businessId)
      .eq("status", "accepted")

    if (activeTasks && activeTasks.length > 0) {
      alert("Ya tenés una tarea en curso")
      return
    }

    await supabase
      .from("task_assignments")
      .update({
        status: "accepted",
        started_at: new Date().toISOString()
      })
      .eq("id", id)

    loadTasks(user.id, businessId!)
  }

  const openCompleteModal = (task:any) => {
    setActiveTask(task)
    setShowStockModal(true)
    setStockInputs({})
    setComment("")
  }

  const confirmComplete = async () => {

    if (!activeTask) return

    await supabase
      .from("task_assignments")
      .update({
        status: "completed",
        completed_at: new Date().toISOString(),
        comment
      })
      .eq("id", activeTask.id)

    for (const productId in stockInputs) {

      const qty = stockInputs[productId]
      if (qty <= 0) continue

      const product = products.find(p => p.id === productId)
      if (!product) continue

      await supabase.from("task_stock_logs").insert({
        task_id: activeTask.task.id,
        product_id: product.id,
        quantity: qty,
        user_id: user.id,
        business_id: businessId
      })

      await supabase
        .from("products")
        .update({ stock: Math.max(0, product.stock - qty) })
        .eq("id", product.id)
    }

    setShowStockModal(false)
    setActiveTask(null)

    loadTasks(user.id, businessId!)
    loadProducts(businessId!)
  }

  const reportIssue = async (taskId:string) => {
    const message = prompt("Describí el problema") || ""
    if (!message) return

    await supabase
      .from("maintenance_reports")
      .insert({
        business_id: businessId,
        user_id: user.id,
        task_id: taskId,
        message
      })

    alert("Reporte enviado ✔")
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = "/login"
  }

  if(showSplash){
    return <OnaSplash onFinish={()=>setShowSplash(false)} />
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src="/ona/ona-icon.png" className="w-8 h-8" />
          <span className="text-lg font-medium">Housekeeping</span>
        </div>

        <button
          onClick={handleLogout}
          className="bg-green-600 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>

      {tasks.length === 0 && (
        <div className="text-sm text-gray-400">
          Sin tareas asignadas
        </div>
      )}

      {tasks.map(t => (
        <div key={t.id} className="border rounded-xl p-4 space-y-2">

          <div className="font-medium">
            {t.task?.title || "Sin título"}
          </div>

          <div className="text-sm text-gray-500">
            {t.task?.description}
          </div>

          <div className="flex gap-2 flex-wrap">

            {t.status === "pending" && (
              <button
                onClick={()=>acceptTask(t.id)}
                className="bg-blue-600 text-white px-2 py-1 text-xs rounded"
              >
                Aceptar
              </button>
            )}

            {t.status === "accepted" && (
              <button
                onClick={()=>openCompleteModal(t)}
                className="bg-green-600 text-white px-2 py-1 text-xs rounded"
              >
                Finalizar
              </button>
            )}

            <button
              onClick={()=>reportIssue(t.task_id)}
              className="bg-red-500 text-white px-2 py-1 text-xs rounded"
            >
              Reportar
            </button>

          </div>

        </div>
      ))}

      {showStockModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white p-4 rounded-xl w-full max-w-sm space-y-3">

            <h2 className="text-sm font-semibold">
              Consumo de productos
            </h2>

            {products.map(p => (
              <div key={p.id} className="flex justify-between items-center text-sm">

                <span>{p.name}</span>

                <input
                  type="number"
                  min="0"
                  value={stockInputs[p.id] || ""}
                  onChange={(e)=>
                    setStockInputs(prev=>({
                      ...prev,
                      [p.id]: Number(e.target.value)
                    }))
                  }
                  className="border w-16 px-2 py-1 rounded text-center"
                />
              </div>
            ))}

            <textarea
              placeholder="Comentario (opcional)"
              value={comment}
              onChange={(e)=>setComment(e.target.value)}
              className="w-full border px-2 py-1 rounded text-sm"
            />

            <button
              onClick={confirmComplete}
              className="w-full bg-green-600 text-white py-2 rounded"
            >
              Finalizar tarea
            </button>

          </div>

        </div>
      )}

    </div>
  )
}