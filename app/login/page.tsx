"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/client"

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    const user = data.user
    if (!user) return

    // 🔥 buscar relación user-business
    const { data: relation, error: relError } = await supabase
      .from("business_users")
      .select("role, business_id")
      .eq("user_id", user.id)
      .single()

    if (relError || !relation) {
      setError("No tenés acceso a ningún negocio")
      setLoading(false)
      return
    }

    // 🔥 obtener slug del business
    const { data: business } = await supabase
      .from("business")
      .select("slug")
      .eq("id", relation.business_id)
      .single()

    const slug = business?.slug

    // 🔥 redirect según rol
    if (relation.role === "admin") {
      router.push(`/admin/${slug}`)
    } else {
      router.push(`/${slug}`)
    }

    router.refresh()
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold">Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2"
          required
        />

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white p-2"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  )
}