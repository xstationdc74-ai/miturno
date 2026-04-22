"use client";

import { useState } from "react";
import Navbar from "@/components/semilla/Navbar";

export default function DemoRestoPage() {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const horarios = ["19:00", "19:30", "20:00", "20:30", "21:00", "21:30"];

  // 👉 PANTALLA DE CONFIRMACIÓN
  if (confirmed) {
    return (
      <main className="min-h-screen bg-[#F5F3EB] flex flex-col items-center justify-center text-center px-6 pb-24">
        
        <div className="text-5xl mb-6">✅</div>

        <h1 className="text-2xl font-semibold text-[#2F4F2F] mb-2">
          Reserva confirmada
        </h1>

        <p className="text-[#5C6F5C] mb-6">
          Te esperamos a las {selectedTime}.
        </p>

        <button
          onClick={() => {
            setConfirmed(false);
            setSelectedTime(null);
          }}
          className="bg-[#2F4F2F] text-white px-6 py-3 rounded-2xl shadow-lg"
        >
          Hacer otra reserva
        </button>

        <Navbar />
      </main>
    );
  }

  // 👉 PANTALLA NORMAL
  return (
    <main className="min-h-screen bg-[#F5F3EB] pb-24 px-4 pt-6">
      
      <h1 className="text-2xl font-semibold text-[#2F4F2F] mb-2">
        Reservar mesa
      </h1>

      <p className="text-[#5C6F5C] mb-6">
        Elegí día y horario para tu reserva.
      </p>

      {/* FECHA */}
      <div className="mb-6">
        <label className="text-sm text-[#5C6F5C] mb-2 block">
          Fecha
        </label>

        <input
          type="date"
          className="w-full p-3 rounded-xl border border-[#E5E3DA] bg-white"
        />
      </div>

      {/* HORARIOS */}
      <div className="mb-6">
        <label className="text-sm text-[#5C6F5C] mb-3 block">
          Horarios disponibles
        </label>

        <div className="grid grid-cols-3 gap-3">
          {horarios.map((hora) => {
            const isSelected = selectedTime === hora;

            return (
              <button
                key={hora}
                onClick={() => setSelectedTime(hora)}
                className={`py-2 rounded-xl border transition ${
                  isSelected
                    ? "bg-[#2F4F2F] text-white border-[#2F4F2F]"
                    : "bg-white border-[#E5E3DA] text-[#2F4F2F]"
                }`}
              >
                {hora}
              </button>
            );
          })}
        </div>
      </div>

      {/* PERSONAS */}
      <div className="mb-8">
        <label className="text-sm text-[#5C6F5C] mb-2 block">
          Personas
        </label>

        <select className="w-full p-3 rounded-xl border border-[#E5E3DA] bg-white">
          <option>1 persona</option>
          <option>2 personas</option>
          <option>3 personas</option>
          <option>4 personas</option>
        </select>
      </div>

      {/* BOTÓN */}
      <button
        disabled={!selectedTime}
        onClick={() => setConfirmed(true)}
        className={`w-full py-4 rounded-2xl shadow-lg transition ${
          selectedTime
            ? "bg-[#2F4F2F] text-white"
            : "bg-gray-300 text-gray-500"
        }`}
      >
        {selectedTime
          ? `Reservar a las ${selectedTime}`
          : "Seleccioná un horario"}
      </button>

      <Navbar />
    </main>
  );
}