"use client"

import CaliNav from "@/components/cali/CaliNav"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"

type AboutContent = {

  hero_title: string
  hero_subtitle: string

  main_text: string
  side_text: string

  image_url: string

  instagram_url: string
}

export default function CaliAcerca() {

  const [content,
    setContent] =
    useState<AboutContent | null>(null)

  const [copied,
    setCopied] =
    useState(false)

  useEffect(() => {

    const loadContent =
      async () => {

      const { data } =
        await supabase
          .from("about_content")
          .select("*")
          .eq(
            "business_id",
            "20ce3f03-7991-423e-8495-d90ed8b1acea"
          )
          .single()

      setContent(data)
    }

    loadContent()

  }, [])

  const copyLink =
    async () => {

    await navigator
      .clipboard
      .writeText(
        window.location.origin
        + "/cali"
      )

    setCopied(true)

    setTimeout(
      () => setCopied(false),
      2000
    )
  }

  return (

<div className="min-h-screen bg-white flex flex-col">

<CaliNav />

<div className="max-w-4xl mx-auto px-6 py-16 text-center space-y-6">

<h1 className="text-3xl md:text-4xl font-serif italic text-[#7FA6C9]">

{content?.hero_title
|| "Acerca de..."}

</h1>

<p className="text-lg md:text-xl font-serif italic text-gray-600">

{content?.hero_subtitle
|| "Un vínculo..."}

</p>

</div>


<div className="max-w-5xl mx-auto px-6 pb-20 space-y-10">

<div className="grid md:grid-cols-2 gap-10 items-center">

{content?.image_url && (

<img
src={content.image_url}
className="w-full rounded-3xl object-cover"
/>

)}

<div className="space-y-6 text-gray-600 leading-relaxed">

{content?.side_text
?.split("\n")
.map((p,i)=>(

<p key={i}>{p}</p>

))}

</div>

</div>


<div className="max-w-3xl mx-auto space-y-6 text-center text-gray-600 leading-relaxed">

{content?.main_text
?.split("\n")
.map((p,i)=>(

<p key={i}>{p}</p>

))}

</div>


{/* 🌿 DIFUSIÓN */}

<div className="
pt-10
text-center

flex
flex-col

items-center

gap-4
">

<p className="italic text-gray-500">

Compartir Cali 🌿

</p>


{content?.instagram_url && (

<a
href={content.instagram_url}
target="_blank"
className="
inline-block
bg-[#7FA6C9]
hover:bg-[#6B93B5]
text-white
px-6
py-3
rounded-2xl
transition
text-sm
"
>

Instagram 🌿

</a>

)}


<button
onClick={copyLink}

className="
bg-[#7FA6C9]
hover:bg-[#6B93B5]
text-white

px-6
py-3

rounded-2xl

transition

text-sm
"
>

{copied
? "Enlace copiado 🌿"
: "Copiar enlace"}

</button>

</div>

</div>


<div className="border-t py-10 text-center space-y-4 mt-10">

<p className="text-sm text-gray-500">

¿Te gustaría una app para vos?

</p>

<a
href="https://wa.me/5491134490093?text=Hola!"
target="_blank"
className="underline text-gray-700"
>

Escribinos por WhatsApp

</a>

</div>

</div>

)
}