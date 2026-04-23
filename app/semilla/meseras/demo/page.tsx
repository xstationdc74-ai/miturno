"use client";

import { useState } from "react";
import Navbar from "@/components/semilla/Navbar";

export default function MeserasDemoPage() {
  const [selectedMesa, setSelectedMesa] = useState<string | null>(null);
  const [pedido, setPedido] = useState("");
  const [sent, setSent] = useState(false);

  const mesas = ["Mesa 1", "Mesa 2", "Mesa 3"];

  // ✅ CONFIRMACION
  if (sent && selectedMesa) {
    return (
      <main className="min-h-screen bg-[#F5F3EB] flex flex-col items-center justify-center text-center px-6 pb-24">
        
        <div className="text-5xl mb-6">🍽️</div>

        <h1 className="text-2xl font-semibold text-[#2F4F2F] mb-2">
          Pedido enviado
        </h1>

        <p className="text-[#5C6F5C] mb-2">
          {selectedMesa}
        </p>

        <p className="text-[#5C6F5C] mb-6">
          {pedido}
        </p>

        <button
          onClick={() => {
            setSent(false);
            setSelectedMesa(null);
            setPedido("");
          }}
          className="bg-[#2F4F2F] text-white px-6 py-3 rounded-2xl shadow-lg"
        >
          Nuevo pedido
        </button>

        <Navbar />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F3EB] pb-24 px-5 pt-6">
      
      <h1 className="text-2xl font-semibold text-[#2F4F2F] mb-2">
        Tomar pedido
      </h1>

      <p className="text-[#5C6F5C] mb-6">
        Seleccioná mesa y cargá el pedido.
      </p>

      {/* MESAS */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {mesas.map((m) => (
          <button
            key={m}
            onClick={() => setSelectedMesa(m)}
            className={`px-4 py-2 rounded-xl border ${
              selectedMesa === m
                ? "bg-[#2F4F2F] text-white border-[#2F4F2F]"
                : "bg-white border-[#E5E3DA] text-[#2F4F2F]"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* PEDIDO */}
      <div className="mb-6">
        <label className="text-sm text-[#5C6F5C] mb-2 block">
          Pedido
        </label>

        <textarea
          value={pedido}
          onChange={(e) => setPedido(e.target.value)}
          className="w-full p-3 rounded-xl border border-[#E5E3DA] bg-white"
          placeholder="Ej: 2 pizzas, 1 cerveza..."
        />
      </div>

      {/* BOTON */}
      <button
        disabled={!selectedMesa || !pedido}
        onClick={() => setSent(true)}
        className={`w-full py-4 rounded-2xl shadow-lg ${
          selectedMesa && pedido
            ? "bg-[#2F4F2F] text-white"
            : "bg-gray-300 text-gray-500"
        }`}
      >
        Enviar a cocina
      </button>

      <Navbar />
    </main>
  );
}