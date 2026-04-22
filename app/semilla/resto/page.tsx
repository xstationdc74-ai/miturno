import Link from "next/link";
import Navbar from "@/components/semilla/Navbar";

export default function RestoPage() {
  return (
    <main className="min-h-screen bg-[#F5F3EB] pb-24">
      
      {/* IMAGEN */}
      <div className="px-4 pt-6">
        <div className="rounded-3xl overflow-hidden">
          <img
            src="/semilla/resto.png"
            alt="Restaurante"
            className="w-full h-56 object-cover"
          />
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="px-5 mt-6">
        
        <h1 className="text-2xl font-semibold text-[#2F4F2F] mb-2">
          Restaurantes
        </h1>

        <p className="text-[#5C6F5C] mb-5">
          Sistema completo para gestión de tu restaurante.
        </p>

        <div className="flex justify-between text-sm text-[#5C6F5C] mb-6">
          <span>📅 Reservas</span>
          <span>🍽️ Mesas</span>
          <span>📖 Carta</span>
          <span>📊 Reportes</span>
        </div>

        {/* CARD */}
        <div className="bg-white rounded-2xl p-5 shadow-lg mb-6">
          <h2 className="text-sm font-medium text-[#2F4F2F] mb-4">
            Próximas reservas
          </h2>

          <div className="flex flex-col gap-3 text-sm text-[#2F4F2F]">
            <div className="flex justify-between">
              <span>20:00</span>
              <span>Julieta R.</span>
              <span>Mesa 4 · 2</span>
            </div>

            <div className="flex justify-between">
              <span>20:30</span>
              <span>Martín L.</span>
              <span>Mesa 7 · 4</span>
            </div>

            <div className="flex justify-between">
              <span>21:00</span>
              <span>Sofía G.</span>
              <span>Mesa 2 · 3</span>
            </div>
          </div>
        </div>

        {/* BOTON */}
        <Link href="/semilla/resto/demo">
          <button className="w-full bg-[#2F4F2F] text-white py-4 rounded-2xl shadow-lg">
            Ver demo completa
          </button>
        </Link>

      </div>

      <Navbar />
    </main>
  );
}