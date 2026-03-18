import { supabase } from "@/lib/supabase/client"

export const dynamic = "force-dynamic"

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {

  const { slug } = await params

  const { data: biz } = await supabase
    .from("business")
    .select("*")
    .eq("slug", slug)
    .single()

  if (!biz) {
    return <div className="p-10">Negocio no encontrado</div>
  }

  const { data: hours } = await supabase
    .from("business_hours")
    .select("*")
    .eq("business_id", biz.id)

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">

      <div>
        <h1 className="text-2xl font-semibold">
          {biz.name}
        </h1>

        <div className="text-sm text-gray-500 space-y-1 mt-2">

          {hours?.map(h => (
            <div key={h.day_of_week}>
              Día {h.day_of_week}: {h.open_time} - {h.close_time}
            </div>
          ))}

        </div>
      </div>

      {/* ACÁ VA TODO LO QUE YA TENÍAS */}
      
    </div>
  )
}