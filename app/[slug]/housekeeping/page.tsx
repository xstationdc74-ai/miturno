"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { getUserBusinessRole } from "@/lib/auth"
import OnaSplash from "@/components/OnaSplash"

type Assignment = {
  id: string
  task_id: string
  status: string
}

type Task = {
  id: string
  title: string
  description: string
  type: string
}

export default function Page({ params }: { params: Promise<{ slug: string }> }) {

  const [slug,setSlug] = useState<string | null>(null)
  const [tasks,setTasks] = useState<any[]>([])
  const [user,setUser] = useState<any>(null)
  const [businessId,setBusinessId] = useState<string | null>(null)

  const [showSplash,setShowSplash] = useState(true)

  useEffect(()=>{
    const loadParams = async () => {
      const p = await params
      setSlug(p.slug)
    }
    loadParams()
  },[params])

  useEffect(()=>{
    const init = async () => {
      if (!slug) return

      const { user, business } = await getUserBusinessRole(slug)
      if (!user || !business) return

      setUser(user)
      setBusinessId(business.id)

      loadTasks(user.id, business.id)
    }

    init()
  },[slug])

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

  // 🔥 SOLO UNA TAREA ACTIVA
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

  const completeTask = async (id:string) => {

    const comment = prompt("Comentario sobre la tarea (opcional)") || ""

    await supabase
      .from("task_assignments")
      .update({
        status: "completed",
        completed_at: new Date().toISOString(),
        comment
      })
      .eq("id", id)

    loadTasks(user.id, businessId!)
  }

  // 🔥 NUEVO: REPORTAR PROBLEMA
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
          <img src="/ona-icon.png" alt="ONA" className="w-8 h-8" />
          <span className="text-lg font-medium">
            Housekeeping
          </span>
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
                onClick={()=>completeTask(t.id)}
                className="bg-green-600 text-white px-2 py-1 text-xs rounded"
              >
                Finalizar
              </button>
            )}

            {/* 🔥 NUEVO BOTÓN */}
            <button
              onClick={()=>reportIssue(t.task_id)}
              className="bg-red-500 text-white px-2 py-1 text-xs rounded"
            >
              Reportar
            </button>

          </div>

        </div>
      ))}

    </div>
  )
}