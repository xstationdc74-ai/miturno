import { supabase } from "@/lib/supabase/client"
import BusinessHero from "@/components/BusinessHero"
import CalendarBooking from "@/components/CalendarBooking"

export const dynamic = "force-dynamic"

export default async function Page({
  params,
}: {
  params: Promise<{ business: string }>
}) {

  const { business } = await params

  const { data: biz } = await supabase
    .from("business")
    .select("*")
    .eq("slug", business)
    .single()

  if (!biz) {
    return <div className="p-10">Negocio no encontrado</div>
  }

  return (

    <div className="max-w-5xl mx-auto">

      <BusinessHero business={biz} />

      <div className="p-6">

        <CalendarBooking businessId={biz.id} />

      </div>

    </div>

  )

}