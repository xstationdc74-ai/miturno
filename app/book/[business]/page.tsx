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

    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">

      {/* HERO */}
      <BusinessHero business={biz} />

      {/* CONTENIDO */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* CALENDARIO */}
        <div className="md:col-span-2 bg-white rounded-xl shadow-sm p-4">

          <h2 className="text-lg font-semibold mb-4">
            Seleccioná un turno
          </h2>

          <CalendarBooking businessId={biz.id} />

        </div>

        {/* INFO LATERAL */}
        <div className="bg-white rounded-xl shadow-sm p-4 h-fit">

          <h3 className="font-semibold mb-2">
            {biz.name}
          </h3>

          {biz.description && (
            <p className="text-sm text-gray-600 mb-3">
              {biz.description}
            </p>
          )}

          <div className="text-xs text-gray-500 space-y-1">

            <div>📍 Villa La Angostura</div>

            {biz.type && (
              <div>🏷 {biz.type}</div>
            )}

          </div>

        </div>

      </div>

    </div>

  )

}