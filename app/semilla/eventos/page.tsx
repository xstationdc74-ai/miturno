import Link from "next/link";
import Navbar from "@/components/semilla/Navbar";

export default function EventosPage() {
  return (
    <main className="min-h-screen bg-[#F5F3EB] pb-24">
      
      {/* IMAGEN */}
      <div className="px-4 pt-6">
        <div className="rounded-3xl overflow-hidden">
          <img
            src="/semilla/eventos.png"
            alt="Eventos y alquileres"
            className="w-full h-56 object-cover"
          />
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="px-5 mt-6">
        
        <h1 className="text-2xl font-semibold text-[#2F4F2F] mb-2">
          Eventos y Alquileres
        </h1>

        <p className="text-[#5C6F5C] mb-5">
          Gestión de alquileres, clases y eventos con disponibilidad en tiempo real.
        </p>

        {/* LISTA */}
        <div className="flex flex-col gap-4 mb-6">
          
          {[
            { name: "Alquiler de ski", type: "Día completo", stock: 5 },
            { name: "Snowboard", type: "Día completo", stock: 3 },
            { name: "Bicicleta", type: "Por hora", stock: 8 },
            { name: "Clase con instructor", type: "Grupal", stock: 2 },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-4 shadow-md"
            >
              <div className="text-[#2F4F2F] font-medium">
                {item.name}
              </div>

              <div className="text-sm text-[#5C6F5C]">
                {item.type}
              </div>

              <div
                className={`text-sm mt-1 ${
                  item.stock <= 3 ? "text-red-500" : "text-[#5C6F5C]"
                }`}
              >
                {item.stock} disponibles
              </div>
            </div>
          ))}
        </div>

        {/* BOTÓN */}
        <Link href="/semilla/eventos/demo">
          <button className="w-full bg-[#2F4F2F] text-white py-4 rounded-2xl shadow-lg">
            Ver demo completa
          </button>
        </Link>

      </div>

      <Navbar />
    </main>
  );
}