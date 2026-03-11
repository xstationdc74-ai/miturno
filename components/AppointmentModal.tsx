// components/AppointmentModal.tsx

"use client"

import { useState } from "react"

type Props = {
  time: string
  open: boolean
  onClose: () => void
  onConfirm: (name: string) => void
}

export default function AppointmentModal({ time, open, onClose, onConfirm }: Props) {
  const [name, setName] = useState("")

  if (!open) return null

  const handleConfirm = () => {
    if (!name.trim()) return
    onConfirm(name.trim())
    setName("")
    onClose()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg p-6 w-80 space-y-4">
        <h2 className="text-lg font-semibold">Nuevo turno {time}</h2>

        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Nombre del cliente"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button
            className="px-3 py-2 text-sm border rounded"
            onClick={onClose}
          >
            Cancelar
          </button>

          <button
            className="px-3 py-2 text-sm bg-blue-600 text-white rounded"
            onClick={handleConfirm}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  )
}