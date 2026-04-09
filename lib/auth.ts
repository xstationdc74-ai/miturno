import { supabase } from "@/lib/supabase/client"

export async function getUserBusinessRole(slug: string) {
  // 🔐 sesión
  const { data: sessionData } = await supabase.auth.getSession()
  const user = sessionData.session?.user

  if (!user) {
    return { user: null, role: null, business: null }
  }

  // 🏢 business
  const { data: biz } = await supabase
    .from("business")
    .select("id")
    .eq("slug", slug)
    .single()

  if (!biz) {
    return { user, role: null, business: null }
  }

  // 🔗 relación user ↔ business
  const { data: relation } = await supabase
    .from("business_users")
    .select("role")
    .eq("user_id", user.id)
    .eq("business_id", biz.id)
    .single()

  return {
    user,
    role: relation?.role || null,
    business: biz,
  }
}