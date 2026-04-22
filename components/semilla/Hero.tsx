import Image from "next/image";
import Features from "./Features";
import InfoCard from "./InfoCard";
import Solutions from "./Solutions";

export default function Hero() {
  return (
    <div className="flex flex-col items-center text-center max-w-md w-full">
      
      <Image
        src="/semilla/logo.png"
        alt="Semilla Studio"
        width={180}
        height={180}
        className="mb-8"
      />

      <h1 className="text-[32px] font-medium text-[#2F4F2F] leading-tight mb-4">
        Tecnología con alma
      </h1>

      <p className="text-[#5C6F5C] text-base leading-relaxed mb-8 px-4">
        Creamos experiencias digitales que impulsan tu negocio.
      </p>

      <button className="bg-[#2F4F2F] text-white px-8 py-4 rounded-2xl shadow-lg hover:opacity-90 transition-all">
        Explorar soluciones
      </button>

      <Features />
      <Solutions />
      <InfoCard />
      
      
    </div>
  );
}