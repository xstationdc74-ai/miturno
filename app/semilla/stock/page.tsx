import Link from "next/link";
import Navbar from "@/components/semilla/Navbar";

export default function StockPage() {
  return (
    <main className="min-h-screen bg-[#F5F3EB] pb-24">
      
      {/* HEADER */}
      <div className="px-5 pt-6">

        <img
  src="/semilla/stock.png"
  alt="Gestión de stock"
  className="rounded-xl mb-4 w-full h-40 object-cover"
/>
        <h1 className="text-2xl font-semibold text-[#2F4F2F] mb-2">
          Stock
        </h1>

        <p className="text-[#5C6F5C] mb-6">
          Control de inventario en tiempo real.
        </p>
      </div>

      {/* RESUMEN */}
      <div className="px-5 mb-6">
        <div className="bg-white rounded-2xl p-5 shadow-lg flex justify-between">
          <div>
            <div className="text-sm text-[#5C6F5C]">Productos</div>
            <div className="text-xl font-semibold text-[#2F4F2F]">24</div>
          </div>

          <div>
            <div className="text-sm text-[#5C6F5C]">Stock bajo</div>
            <div className="text-xl font-semibold text-red-500">3</div>
          </div>
        </div>
      </div>

      {/* LISTA */}
      <div className="px-5 flex flex-col gap-4">
        
        {[
          { name: "Aceite esencial", qty: 12 },
          { name: "Velas aromáticas", qty: 3 },
          { name: "Toallas", qty: 8 },
          { name: "Cremas", qty: 2 },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-4 shadow-md flex justify-between items-center"
          >
            <div>
              <div className="text-[#2F4F2F] font-medium">
                {item.name}
              </div>
              <div
                className={`text-sm ${
                  item.qty <= 3 ? "text-red-500" : "text-[#5C6F5C]"
                }`}
              >
                {item.qty} unidades
              </div>
            </div>

            <div className="text-[#2F4F2F] text-lg">›</div>
          </div>
        ))}
      </div>

      {/* BOTON */}
      <div className="px-5 mt-6">
        <Link href="/semilla/stock/demo">
          <button className="w-full bg-[#2F4F2F] text-white py-4 rounded-2xl shadow-lg">
            Ver demo completa
          </button>
        </Link>
      </div>

      <Navbar />
    </main>
  );
}