"use client";

import { useState } from "react";
import Navbar from "@/components/semilla/Navbar";

export default function EventosDemoPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [items, setItems] = useState([
    {
      name: "Alquiler de ski",
      type: "Día completo",
      stock: 5,
    },
    {
      name: "Snowboard",
      type: "Día completo",
      stock: 3,
    },
    {
      name: "Bicicleta",
      type: "Por hora",
      stock: 8,
    },
    {
      name: "Clase con instructor",
      type: "Grupal",
      stock: 2,
    },
  ]);

  const reservar = () => {
    if (selected === null || !name || !phone) return;

    const nuevos = [...items];
    nuevos[selected].stock = Math.max(0, nuevos[selected].stock - 1);
    setItems(nuevos);

    setConfirmed(true);
  };

  // ✅ CONFIRMACIÓN
  if (confirmed && selected !== null) {
    const item = items[selected];

    return (
      <main className="min-h-screen bg-[#F5F3EB] flex flex-col items-center justify-center text-center px-6 pb-24">
        
        <div className="text-5xl mb-6">🎿</div>

        <h1 className="text-2xl font-semibold text-[#2F4F2F] mb-2">
          Reserva confirmada
        </h1>

        <p className="text-[#5C6F5C] mb-2">
          {item.name}
        </p>

        <p className="text-[#5C6F5C]">
          {item.type}
        </p>

        <p className="text-[#5C6F5C] mb-6">
          A nombre de {name}
        </p>

        <button
          onClick={() => {
            setConfirmed(false);
            setSelected(null);
            setName("");
            setPhone("");
          }}
          className="bg-[#2F4F2F] text-white px-6 py-3 rounded-2xl shadow-lg"
        >
          Nueva reserva
        </button>

        <Navbar />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F3EB] pb-24 px-5 pt-6">
      
      <h1 className="text-2xl font-semibold text-[#2F4F2F] mb-2">
        Reservar alquiler / evento
      </h1>

      <p className="text-[#5C6F5C] mb-6">
        Elegí servicio y disponibilidad.
      </p>

      {/* LISTA */}
      <div className="flex flex-col gap-4 mb-6">
        {items.map((item, i) => {
          const isSelected = selected === i;

          return (
            <div
              key={i}
              onClick={() => setSelected(i)}
              className={`rounded-2xl p-4 shadow-md cursor-pointer ${
                isSelected ? "bg-[#2F4F2F] text-white" : "bg-white"
              }`}
            >
              <div className="font-medium">{item.name}</div>

              <div className="text-sm opacity-80">
                {item.type}
              </div>

              <div
                className={`text-sm mt-1 ${
                  item.stock <= 3
                    ? "text-red-500"
                    : isSelected
                    ? "text-white"
                    : "text-[#5C6F5C]"
                }`}
              >
                {item.stock} disponibles
              </div>
            </div>
          );
        })}
      </div>

      {/* FORM */}
      <div className="mb-6">
        <label className="text-sm text-[#5C6F5C] mb-2 block">
          Nombre
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded-xl border border-[#E5E3DA] bg-white mb-3"
          placeholder="Tu nombre"
        />

        <label className="text-sm text-[#5C6F5C] mb-2 block">
          Teléfono
        </label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-3 rounded-xl border border-[#E5E3DA] bg-white"
          placeholder="Ej: 294..."
        />
      </div>

      {/* BOTÓN */}
      <button
        disabled={selected === null || !name || !phone}
        onClick={reservar}
        className={`w-full py-4 rounded-2xl shadow-lg ${
          selected !== null && name && phone
            ? "bg-[#2F4F2F] text-white"
            : "bg-gray-300 text-gray-500"
        }`}
      >
        Confirmar reserva
      </button>

      <Navbar />
    </main>
  );
}