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
}

export default function Page({ params }: { params: Promise<{ slug: string }> }) {

  const [slug,setSlug] = useState<string | null>(null)
  const [biz,setBiz] = useState<Business | null>(null)

  const [tasks,setTasks] = useState<Task[]>([])
  const [staff,setStaff] = useState<Staff[]>([])
  const [assignments,setAssignments] = useState<Assignment[]>([])

  const [taskTitle,setTaskTitle] = useState("")
  const [taskDesc,setTaskDesc] = useState("")
  const [taskType,setTaskType] = useState("common")
  const [selectedUsers,setSelectedUsers] = useState<string[]>([""])

  // 🔥 splash
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

  // 🔥 SPLASH FIRST
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
          <span className="text-lg font-medium">
            Admin
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="bg-green-600 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
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