import Link from "next/link";

export default function Navbar() {
  return (
    <div className="fixed bottom-4 left-0 right-0 flex justify-center z-50">
      
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg px-6 py-3 flex gap-8 text-sm text-[#5C6F5C]">
        
        <Link href="/semilla" className="flex flex-col items-center">
          <span>🏠</span>
          <span>Inicio</span>
        </Link>

        <div className="flex flex-col items-center">
          <span>🧩</span>
          <span>Soluciones</span>
        </div>

        <div className="flex flex-col items-center">
          <span>📊</span>
          <span>Casos</span>
        </div>

        <div className="flex flex-col items-center">
          <span>💬</span>
          <span>Contacto</span>
        </div>

      </div>
    </div>
  );
}