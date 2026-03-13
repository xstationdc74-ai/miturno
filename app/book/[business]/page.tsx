import Calendar from "@/components/Calendar"
import SplashScreen from "@/components/SplashScreen"

export default async function Page({
  params,
}: {
  params: Promise<{ business: string }>
}) {

  const { business } = await params

  return (

    <SplashScreen>

      <Calendar business={business} />

    </SplashScreen>

  )

}