"use client";

import { useState } from "react";
import Navbar from "@/components/semilla/Navbar";

export default function DemoBienestarPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedPro, setSelectedPro] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const servicios = ["Masaje", "Reiki", "Facial"];
  const profesionales = ["Ana", "Lucía", "Carla"];
  const horarios = ["15:00", "16:00", "17:00", "18:00"];

  // ✅ CONFIRMACIÓN
  if (confirmed) {
    return (
      <main className="min-h-screen bg-[#F5F3EB] flex flex-col items-center justify-center text-center px-6 pb-24">
        
        <div className="text-5xl mb-6">✨</div>

        <h1 className="text-2xl font-semibold text-[#2F4F2F] mb-2">
          Turno confirmado
        </h1>

        <p className="text-[#5C6F5C] mb-6">
          {selectedService} con {selectedPro} a las {selectedTime}
        </p>

        <button
          onClick={() => {
            setConfirmed(false);
            setSelectedService(null);
            setSelectedPro(null);
            setSelectedTime(null);
          }}
          className="bg-[#2F4F2F] text-white px-6 py-3 rounded-2xl shadow-lg"
        >
          Reservar otro turno
        </button>

        <Navbar />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F3EB] pb-24 px-4 pt-6">
      
      <h1 className="text-2xl font-semibold text-[#2F4F2F] mb-2">
        Reservar turno
      </h1>

      <p className="text-[#5C6F5C] mb-6">
        Elegí servicio, profesional y horario.
      </p>

      {/* SERVICIOS */}
      <div className="mb-6">
        <label className="text-sm text-[#5C6F5C] mb-3 block">
          Servicio
        </label>

        <div className="flex gap-2 flex-wrap">
          {servicios.map((s) => (
            <button
              key={s}
              onClick={() => setSelectedService(s)}
              className={`px-4 py-2 rounded-xl border ${
                selectedService === s
                  ? "bg-[#2F4F2F] text-white border-[#2F4F2F]"
                  : "bg-white border-[#E5E3DA] text-[#2F4F2F]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* PROFESIONALES */}
      <div className="mb-6">
        <label className="text-sm text-[#5C6F5C] mb-3 block">
          Profesional
        </label>

        <div className="flex gap-2 flex-wrap">
          {profesionales.map((p) => (
            <button
              key={p}
              onClick={() => setSelectedPro(p)}
              className={`px-4 py-2 rounded-xl border ${
                selectedPro === p
                  ? "bg-[#2F4F2F] text-white border-[#2F4F2F]"
                  : "bg-white border-[#E5E3DA] text-[#2F4F2F]"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* HORARIOS */}
      <div className="mb-8">
        <label className="text-sm text-[#5C6F5C] mb-3 block">
          Horario
        </label>

        <div className="grid grid-cols-3 gap-3">
          {horarios.map((h) => (
            <button
              key={h}
              onClick={() => setSelectedTime(h)}
              className={`py-2 rounded-xl border ${
                selectedTime === h
                  ? "bg-[#2F4F2F] text-white border-[#2F4F2F]"
                  : "bg-white border-[#E5E3DA] text-[#2F4F2F]"
              }`}
            >
              {h}
            </button>
          ))}
        </div>
      </div>

      {/* BOTÓN */}
      <button
        disabled={!selectedService || !selectedPro || !selectedTime}
        onClick={() => setConfirmed(true)}
        className={`w-full py-4 rounded-2xl shadow-lg transition ${
          selectedService && selectedPro && selectedTime
            ? "bg-[#2F4F2F] text-white"
            : "bg-gray-300 text-gray-500"
        }`}
      >
        Confirmar turno
      </button>

      <Navbar />
    </main>
  );
}