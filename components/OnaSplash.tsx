"use client"

import { useEffect, useState } from "react"

export default function OnaSplash({ onFinish }: { onFinish: () => void }) {

  const [visible,setVisible] = useState(true)

  useEffect(()=>{
    const timer = setTimeout(()=>{
      setVisible(false)
      onFinish()
    }, 2000)

    return () => clearTimeout(timer)
  },[])

  if(!visible) return null

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">

      <img
        src="/ona-logo.png"
        alt="ONA"
        className="w-40"
      />

    </div>
  )
}