import Link from "next/link";
import Navbar from "@/components/semilla/Navbar";

export default function BienestarPage() {
  return (
    <main className="min-h-screen bg-[#F5F3EB] pb-24">
      
      {/* IMAGEN */}
      <div className="px-4 pt-6">
        <div className="rounded-3xl overflow-hidden">
          <img
            src="/semilla/bienestar.png"
            alt="Bienestar"
            className="w-full h-56 object-cover"
          />
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="px-5 mt-6">
        
        <h1 className="text-2xl font-semibold text-[#2F4F2F] mb-2">
          Bienestar
        </h1>

        <p className="text-[#5C6F5C] mb-5">
          Gestión de turnos para centros de bienestar y profesionales.
        </p>

        {/* ICONOS */}
        <div className="flex justify-between text-sm text-[#5C6F5C] mb-6">
          <span>🧘‍♀️ Servicios</span>
          <span>👩‍⚕️ Profesionales</span>
          <span>📅 Turnos</span>
          <span>💬 WhatsApp</span>
        </div>

        {/* CARD */}
        <div className="bg-white rounded-2xl p-5 shadow-lg mb-6">
          <h2 className="text-sm font-medium text-[#2F4F2F] mb-4">
            Próximos turnos
          </h2>

          <div className="flex flex-col gap-3 text-sm text-[#2F4F2F]">
            <div className="flex justify-between">
              <span>15:00</span>
              <span>Ana</span>
              <span>Masaje relajante</span>
            </div>

            <div className="flex justify-between">
              <span>16:00</span>
              <span>Lucía</span>
              <span>Reiki</span>
            </div>

            <div className="flex justify-between">
              <span>17:30</span>
              <span>Carla</span>
              <span>Facial</span>
            </div>
          </div>
        </div>

        {/* BOTON */}
        <Link href="/semilla/bienestar/demo">
          <button className="w-full bg-[#2F4F2F] text-white py-4 rounded-2xl shadow-lg">
            Ver demo completa
          </button>
        </Link>

      </div>

      <Navbar />
    </main>
  );
}