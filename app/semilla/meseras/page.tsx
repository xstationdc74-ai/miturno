import Link from "next/link";
import Navbar from "@/components/semilla/Navbar";

export default function MeserasPage() {
  return (
    <main className="min-h-screen bg-[#F5F3EB] pb-24">

      {/* IMAGEN */}
      <div className="px-4 pt-6">
        <div className="rounded-3xl overflow-hidden">
          <img
            src="/semilla/meseras.png"
            alt="Sistema para meseras"
            className="w-full h-56 object-cover"
          />
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="px-5 mt-6">
        
        <h1 className="text-2xl font-semibold text-[#2F4F2F] mb-2">
          Sistema para Meseras
        </h1>

        <p className="text-[#5C6F5C] mb-5">
          Gestión de mesas, pedidos y comunicación con cocina en tiempo real.
        </p>

        {/* LISTA */}
        <div className="flex flex-col gap-4 mb-6">
          
          {[
            { mesa: "Mesa 1", status: "Ocupada" },
            { mesa: "Mesa 2", status: "Libre" },
            { mesa: "Mesa 3", status: "Ocupada" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-4 shadow-md flex justify-between"
            >
              <div className="text-[#2F4F2F] font-medium">
                {item.mesa}
              </div>

              <div
                className={`text-sm ${
                  item.status === "Ocupada"
                    ? "text-red-500"
                    : "text-green-600"
                }`}
              >
                {item.status}
              </div>
            </div>
          ))}
        </div>

        {/* BOTON */}
        <Link href="/semilla/meseras/demo">
          <button className="w-full bg-[#2F4F2F] text-white py-4 rounded-2xl shadow-lg">
            Ver demo completa
          </button>
        </Link>

      </div>

      <Navbar />
    </main>
  );
}