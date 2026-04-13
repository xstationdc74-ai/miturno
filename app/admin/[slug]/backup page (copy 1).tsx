"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import OnaSplash from "@/components/OnaSplash"

type Business = {
  id: string
  name: string
}

type Staff = {
  user_id: string
  email: string
}

type Task = {
  id: string
  title: string
  description: string
  type: string
}

type Assignment = {
  id: string
  task_id: string
  user_id: string
  status: string
  comment: string | null
  started_at?: string
  completed_at?: string
}

type Report = {
  id: string
  message: string
  user_id: string
  task_id: string
  created_at: string
}

export default function Page({ params }: { params: Promise<{ slug: string }> }) {

  const [slug,setSlug] = useState<string | null>(null)
  const [biz,setBiz] = useState<Business | null>(null)

  const [tasks,setTasks] = useState<Task[]>([])
  const [staff,setStaff] = useState<Staff[]>([])
  const [assignments,setAssignments] = useState<Assignment[]>([])
  const [reports,setReports] = useState<Report[]>([]) // 🔥 NUEVO


// 🔥 STOCK
type Product = {
  id: string
  name: string
  stock: number
}

const [products,setProducts] = useState<Product[]>([])
const [newProductName,setNewProductName] = useState("")
const [newProductStock,setNewProductStock] = useState("")


  const [taskTitle,setTaskTitle] = useState("")
  const [taskDesc,setTaskDesc] = useState("")
  const [taskType,setTaskType] = useState("common")
  const [selectedUsers,setSelectedUsers] = useState<string[]>([""])

  const [showSplash,setShowSplash] = useState(true)

  useEffect(()=>{
    const loadParams = async () => {
      const p = await params
      setSlug(p.slug)
    }
    loadParams()
  },[params])

  useEffect(()=>{
    if(!slug) return

    loadData()

    const interval = setInterval(() => {
      loadData()
    }, 5000)

    return () => clearInterval(interval)

  },[slug])

  const loadData = async () => {

    const { data: bizData } = await supabase
      .from("business")
      .select("*")
      .eq("slug", slug)
      .single()

    if(!bizData) return

    setBiz(bizData)

    const { data: tasksData } = await supabase
      .from("tasks")
      .select("*")
      .eq("business_id", bizData.id)
      .order("created_at", { ascending: false })

    setTasks(tasksData || [])

    const { data: assignmentsData } = await supabase
      .from("task_assignments")
      .select("*")
      .eq("business_id", bizData.id)

    setAssignments(assignmentsData || [])

    // 🔥 NUEVO: REPORTES
    const { data: reportsData } = await supabase
      .from("maintenance_reports")
      .select("*")
      .eq("business_id", bizData.id)
      .order("created_at", { ascending: false })

    setReports(reportsData || [])

    // 🔥 STOCK
const { data: prodData } = await supabase
  .from("products")
  .select("*")
  .eq("business_id", bizData.id)

setProducts(prodData || [])

    const { data: relations } = await supabase
      .from("business_users")
      .select("user_id")
      .eq("business_id", bizData.id)
      .eq("role", "staff")

    if (relations) {
      const ids = relations.map(r => r.user_id)

      const { data: profiles } = await supabase
        .from("profiles")
        .select("id,email")
        .in("id", ids)

      setStaff((profiles || []).map(p => ({
        user_id: p.id,
        email: p.email
      })))
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = "/login"
  }

  const handleSelectChange = (index:number, value:string) => {
    const updated = [...selectedUsers]
    updated[index] = value
    setSelectedUsers(updated)
  }

  const addSelect = () => {
    setSelectedUsers(prev => [...prev, ""])
  }

  const createTask = async () => {

    if(!biz) return
    if(!taskTitle) {
      alert("Falta título")
      return
    }

    const { data: newTask } = await supabase
      .from("tasks")
      .insert({
        business_id: biz.id,
        title: taskTitle,
        description: taskDesc,
        type: taskType
      })
      .select()
      .single()

    if (!newTask) return

    for (const userId of selectedUsers) {
      if (!userId) continue

      await supabase
        .from("task_assignments")
        .insert({
          task_id: newTask.id,
          user_id: userId,
          business_id: biz.id,
          status: "pending"
        })
    }

    setTaskTitle("")
    setTaskDesc("")
    setTaskType("common")
    setSelectedUsers([""])

    await loadData()
  }
// 🔥 STOCK
const createProduct = async () => {
  if(!biz || !newProductName) return

  await supabase.from("products").insert({
    business_id: biz.id,
    name: newProductName,
    stock: Number(newProductStock || 0)
  })

  setNewProductName("")
  setNewProductStock("")
  loadData()
}

const deleteProduct = async (id:string) => {
  await supabase.from("products").delete().eq("id", id)
  loadData()

}
const deleteTask = async (taskId:string) => {
    if (!confirm("Eliminar tarea?")) return

    await supabase.from("task_assignments").delete().eq("task_id", taskId)
    await supabase.from("tasks").delete().eq("id", taskId)

    loadData()
  }

  const getStatusColor = (status:string) => {
    if (status === "completed") return "text-green-600"
    if (status === "accepted") return "text-blue-600"
    if (status === "rejected") return "text-red-600"
    return "text-yellow-500"
  }

  const getUserEmail = (userId:string) => {
    return staff.find(s => s.user_id === userId)?.email || "usuario"
  }

  const getDuration = (start:string, end?:string) => {
    if (!start) return null

    const startDate = new Date(start + "Z")
    const endDate = end ? new Date(end + "Z") : new Date()

    const diffMs = endDate.getTime() - startDate.getTime()

    return Math.max(0, Math.floor(diffMs / 60000))
  }

  const getStats = (userId:string) => {
    const userAssignments = assignments.filter(a => a.user_id === userId)
    const total = userAssignments.length
    const completed = userAssignments.filter(a => a.status === "completed").length
    const active = userAssignments.some(a => a.status === "accepted")
    return { total, completed, active }
  }

  if(showSplash){
    return <OnaSplash onFinish={()=>setShowSplash(false)} />
  }

  if (!biz) return <div className="p-10">Cargando...</div>

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src="/ona-icon.png" className="w-8 h-8" />
          <span className="text-lg font-medium">Admin</span>
        </div>

        <button
          onClick={handleLogout}
          className="bg-green-600 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>

{/* 📦 STOCK */}
<div className="bg-white p-4 rounded-xl border space-y-3">

  <h2 className="text-sm font-semibold">📦 Stock</h2>

  <div className="flex gap-2">
    <input
      placeholder="Producto"
      value={newProductName}
      onChange={e=>setNewProductName(e.target.value)}
      className="border px-2 py-1 rounded text-sm w-full"
    />

    <input
      type="number"
      placeholder="Stock"
      value={newProductStock}
      onChange={e=>setNewProductStock(e.target.value)}
      className="border px-2 py-1 rounded text-sm w-20"
    />

    <button
      onClick={createProduct}
      className="bg-green-600 text-white px-2 rounded"
    >
      +
    </button>
  </div>

  {products.map(p => (
    <div key={p.id} className="flex justify-between items-center text-sm">

      <div>{p.name}</div>

      <div className="flex items-center gap-2">

        <button
          onClick={async ()=>{
            await supabase.from("products")
              .update({ stock: Math.max(0, p.stock - 1) })
              .eq("id", p.id)
            loadData()
          }}
        >-</button>

        <div>{p.stock}</div>

        <button
          onClick={async ()=>{
            await supabase.from("products")
              .update({ stock: p.stock + 1 })
              .eq("id", p.id)
            loadData()
          }}
        >+</button>

        <button
          onClick={()=>deleteProduct(p.id)}
          className="text-red-600"
        >
          x
        </button>

      </div>

    </div>
  ))}

</div>

      {/* DASHBOARD */}
      <div className="bg-white p-4 rounded-xl border space-y-3">

        <h2 className="text-sm font-semibold">Equipo</h2>

        {staff.map(s => {

          const stats = getStats(s.user_id)

          const activeTask = assignments
            .filter(a => a.user_id === s.user_id && a.status === "accepted")
            .sort((a,b) => new Date(b.started_at || "").getTime() - new Date(a.started_at || "").getTime())[0]

          return (
            <div key={s.user_id} className="flex justify-between items-center border-b pb-2">

              <div>
                <div className="text-sm font-medium">{s.email}</div>
                <div className="text-xs text-gray-500">
                  {stats.completed} / {stats.total} tareas
                </div>
              </div>

              <div className="text-xs flex flex-col items-end">

                {stats.active ? (
                  <>
                    <div className="flex items-center gap-1">
                      <span className="text-green-600">🟢</span>
                      <span className="text-gray-600">En curso</span>
                    </div>

                    {activeTask?.started_at && (
                      <>
                        <div className="text-gray-400">
                          ⏱ {getDuration(activeTask.started_at)} min
                        </div>

                        <div className="text-gray-400 text-[11px]">
                          {tasks.find(t => t.id === activeTask.task_id)?.title}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="flex items-center gap-1">
                    <span className="text-gray-400">⚪</span>
                    <span className="text-gray-400">Sin actividad</span>
                  </div>
                )}

              </div>

            </div>
          )
        })}

      </div>

      {/* 🛠 REPORTES */}
      <div className="bg-white p-4 rounded-xl border space-y-3">

        <h2 className="text-sm font-semibold">🛠 Reportes de mantenimiento</h2>

        {reports.length === 0 && (
          <div className="text-xs text-gray-400">
            Sin reportes
          </div>
        )}

        {reports.map(r => (
          <div key={r.id} className="border rounded-lg p-3 text-sm">

            <div className="font-medium">
              {getUserEmail(r.user_id)}
            </div>

            <div className="text-gray-600">
              {tasks.find(t => t.id === r.task_id)?.title || "Tarea"}
            </div>

            <div className="text-gray-500 text-xs">
              {new Date(r.created_at + "Z").toLocaleString("es-AR")}
            </div>

            <div className="mt-1">
              💬 {r.message}
            </div>

          </div>
        ))}

      </div>

      {/* CREAR */}
      <div className="bg-white p-4 rounded-xl border space-y-4">

        <h2 className="text-sm font-semibold">Crear tarea</h2>

        <input
          placeholder="Título"
          value={taskTitle}
          onChange={e=>setTaskTitle(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg text-sm"
        />

        <textarea
          placeholder="Descripción"
          value={taskDesc}
          onChange={e=>setTaskDesc(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg text-sm"
        />

        <select
          value={taskType}
          onChange={e=>setTaskType(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg text-sm"
        >
          <option value="common">Espacios comunes</option>
          <option value="daily">Servicio diario</option>
          <option value="checkout">Check-out</option>
        </select>

        {selectedUsers.map((user, index) => (
          <select
            key={index}
            value={user}
            onChange={(e)=>handleSelectChange(index, e.target.value)}
            className="w-full border px-3 py-2 rounded-lg text-sm"
          >
            <option value="">Seleccionar mucama</option>
            {staff.map(s => (
              <option key={s.user_id} value={s.user_id}>
                {s.email}
              </option>
            ))}
          </select>
        ))}

        <button onClick={addSelect} className="text-xs text-blue-600">
          + Agregar otra mucama
        </button>

        <button
          onClick={createTask}
          className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm"
        >
          Crear tarea
        </button>
      </div>

      {/* LISTA */}
      <div className="space-y-3">

        {tasks.map(t => {

          const taskAssignments = assignments.filter(a => a.task_id === t.id)

          return (
            <div key={t.id} className="border rounded-xl p-4 space-y-2">

              <div className="font-medium">{t.title}</div>
              <div className="text-sm text-gray-500">{t.description}</div>

              {taskAssignments.map(a => (
                <div key={a.id} className="text-xs">

                  <span className="font-medium">
                    {getUserEmail(a.user_id)}
                  </span>

                  {" - "}

                  <span className={getStatusColor(a.status)}>
                    {a.status}
                  </span>

                  {a.comment && (
                    <div className="text-gray-500">
                      💬 {a.comment}
                    </div>
                  )}

                  {a.started_at && a.completed_at && (
                    <div className="text-gray-400">
                      ⏱ {getDuration(a.started_at, a.completed_at)} min
                    </div>
                  )}

                </div>
              ))}

              <button
                onClick={()=>deleteTask(t.id)}
                className="text-xs text-red-600"
              >
                Eliminar
              </button>

            </div>
          )
        })}

      </div>

    </div>
  )
}