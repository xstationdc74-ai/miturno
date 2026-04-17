"use client"

import { useState } from "react"

export default function SumatePage(){

  const [name,setName] = useState("")
  const [business,setBusiness] = useState("")
  const [type,setType] = useState("")
  const [phone,setPhone] = useState("")

  const handleSubmit = () => {

  if(!name || !business || !phone){
    alert("Completá los datos 🙏")
    return
  }

  const text = `Hola! Soy ${name}.
Tengo un espacio llamado "${business}" (${type || "sin tipo"}).
Mi WhatsApp es ${phone}.
Me gustaría sumarme a Kume 🌱`

  const url = `https://wa.me/5491134490093?text=${encodeURIComponent(text)}`

  window.open(url, "_blank")
}

  return(

    <div className="max-w-2xl mx-auto px-6 py-16 space-y-12">

      {/* TEXTO */}
      <div className="space-y-4 text-center">

        <h1 className="text-2xl font-medium">
          Sumate a Kume
        </h1>

        <p className="text-gray-500">
          Si tenés un espacio con identidad  
          y querés compartirlo,  
          Kume es para vos.
        </p>

      </div>

      {/* BENEFICIOS */}
      <div className="space-y-2 text-sm text-gray-600">

        <p>• Gestión simple de reservas</p>
        <p>• Visibilidad en tu comunidad</p>
        <p>• Conexión con personas reales</p>

      </div>

      {/* FORM */}
      <div className="space-y-4">

        <input
          placeholder="Tu nombre"
          value={name}
          onChange={e=>setName(e.target.value)}
          className="w-full h-10 px-3 border rounded-lg text-sm"
        />

        <input
          placeholder="Nombre del espacio"
          value={business}
          onChange={e=>setBusiness(e.target.value)}
          className="w-full h-10 px-3 border rounded-lg text-sm"
        />

        <input
          placeholder="Tipo (ej: barbería, arte...)"
          value={type}
          onChange={e=>setType(e.target.value)}
          className="w-full h-10 px-3 border rounded-lg text-sm"
        />

        <input
          placeholder="WhatsApp"
          value={phone}
          onChange={e=>setPhone(e.target.value)}
          className="w-full h-10 px-3 border rounded-lg text-sm"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 text-white py-2 rounded-lg"
        >
          Enviar
        </button>

      </div>

    </div>
  )
}