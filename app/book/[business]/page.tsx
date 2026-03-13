import Calendar from "@/components/Calendar"
import SplashScreen from "@/components/SplashScreen"
import FavoriteBusiness from "@/components/FavoriteBusiness"
import BusinessHero from "@/components/BusinessHero"

import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function Page({
  params,
}: {
  params: Promise<{ business: string }>
}) {

  const { business } = await params

  const { data } = await supabase
    .from("business")
    .select("name,description,cover_image")
    .eq("slug", business)
    .single()

  if (!data) return null

  return (

    <SplashScreen>

      <div className="max-w-sm mx-auto mt-6 space-y-6">

        <BusinessHero
          name={data.name}
          description={data.description}
          image={data.cover_image}
        />

        <FavoriteBusiness slug={business} />

        <Calendar business={business} />

      </div>

    </SplashScreen>

  )

}