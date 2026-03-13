"use client"

import { useEffect, useState } from "react"

export default function SplashScreen({children}:{children:React.ReactNode}){

const [showSplash,setShowSplash]=useState(true)

useEffect(()=>{

const timer=setTimeout(()=>{
setShowSplash(false)
},1500)

return ()=>clearTimeout(timer)

},[])

if(showSplash){

return(

<div className="flex flex-col items-center justify-center h-screen bg-black text-white">

<img
src="/logo-barberia2.png"
className="w-20 mb-6"
/>

<h1 className="text-2xl font-semibold">
Bienvenido
</h1>

</div>

)

}

return <>{children}</>

}