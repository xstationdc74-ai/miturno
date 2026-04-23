import Link from "next/link";
import Navbar from "@/components/semilla/Navbar";

export default function ExperienciasPage() {
  return (
    <main className="min-h-screen bg-[#F5F3EB] pb-24">
      
      {/* IMAGEN */}
      <div className="px-4 pt-6">
        <div className="rounded-3xl overflow-hidden">
          <img
            src="/semilla/experiencias.png"
            alt="Experiencias"
            className="w-full h-56 object-cover"
          />
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="px-5 mt-6">
        
        <h1 className="text-2xl font-semibold text-[#2F4F2F] mb-2">
          Experiencias y Excursiones
        </h1>

        <p className="text-[#5C6F5C] mb-5">
          Organizá excursiones y experiencias con reservas, cupos y gestión en tiempo real.
        </p>

        {/* LISTA */}
        <div className="flex flex-col gap-4 mb-6">
          
          {[
            {
              name: "Trekking al Lago Escondido",
              date: "Sábado 10",
              spots: 3,
            },
            {
              name: "Navegación en velero",
              date: "Domingo 11",
              spots: 5,
            },
            {
              name: "Excursión en kayak",
              date: "Viernes 16",
              spots: 2,
            },
            {
              name: "Ski day Cerro Catedral",
              date: "Sábado 17",
              spots: 4,
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-4 shadow-md"
            >
              <div className="text-[#2F4F2F] font-medium">
                {item.name}
              </div>

              <div className="text-sm text-[#5C6F5C]">
                {item.date}
              </div>

              <div
                className={`text-sm mt-1 ${
                  item.spots <= 3 ? "text-red-500" : "text-[#5C6F5C]"
                }`}
              >
                {item.spots} cupos disponibles
              </div>
            </div>
          ))}
        </div>

        {/* BOTÓN */}
        <Link href="/semilla/experiencias/demo">
          <button className="w-full bg-[#2F4F2F] text-white py-4 rounded-2xl shadow-lg">
            Ver demo completa
          </button>
        </Link>

      </div>

      <Navbar />
    </main>
  );
}