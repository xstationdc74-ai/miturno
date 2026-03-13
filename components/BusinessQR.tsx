"use client"

import { QRCodeCanvas } from "qrcode.react"
import { useRef } from "react"

type Props = {
  slug: string
}

export default function BusinessQR({ slug }: Props) {

  const qrRef = useRef<HTMLDivElement>(null)

  const url = `http://localhost:3000/book/${slug}`

  const downloadQR = () => {

    const canvas = qrRef.current?.querySelector("canvas")

    if (!canvas) return

    const png = canvas.toDataURL("image/png")

    const link = document.createElement("a")
    link.href = png
    link.download = `qr-${slug}.png`
    link.click()

  }

  return (

    <div className="flex flex-col items-center space-y-5">

      <div ref={qrRef}>
        <QRCodeCanvas value={url} size={220} />
      </div>

      <button
        onClick={downloadQR}
        className="px-4 py-2 bg-black text-white rounded-md text-sm"
      >
        Descargar QR
      </button>

      <p className="text-sm text-gray-500">
        Escaneá para reservar turno
      </p>

    </div>

  )

}