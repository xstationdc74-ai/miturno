import Hero from "@/components/semilla/Hero";
import Navbar from "@/components/semilla/Navbar";

export default function SemillaPage() {
  return (
    <main
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url('/semilla/bg.png')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#F5F3EB]/40 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6 pt-20 pb-24 min-h-screen">
        <Hero />
      </div>

      {/* Navbar */}
      <Navbar />
    </main>
  );
}