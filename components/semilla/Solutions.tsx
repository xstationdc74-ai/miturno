import Link from "next/link";

export default function Solutions() {
  const items = [
    {
      title: "Restaurantes",
      desc: "Reservas, gestión de mesas, carta digital y más.",
      icon: "🍽️",
      href: "/semilla/resto",
      image: "/semilla/resto.png",
    },
    {
      title: "Bienestar",
      desc: "Turnos, profesionales, pagos y recordatorios por WhatsApp.",
      icon: "🧘‍♀️",
      href: "/semilla/bienestar",
      image: "/semilla/bienestar.png",
    },
    {
      title: "Talleres y Cursos",
      desc: "Gestión de eventos, cupos, inscripciones y pagos.",
      icon: "🎨",
      href: "/semilla/talleres",
      image: "/semilla/talleres.png",
    },
    {
      title: "Stock e Inventario",
      desc: "Control de stock en tiempo real, alertas y reportes.",
      icon: "📦",
      href: "/semilla/stock",
      image: "/semilla/stock.png",
    },
    {
      title: "Sistema para Meseras",
      desc: "Toma de pedidos, comandas y control de mesas.",
      icon: "🧾",
      href: "/semilla/meseras",
      image: "/semilla/meseras.png",
    },
    {
      title: "Experiencias y Excursiones",
      desc: "Organizá excursiones y experiencias con reservas, cupos y gestión en tiempo real.",
      icon: "🎪",
      href: "/semilla/experiencias",
      image: "/semilla/experiencias.png",
    },
    {
      title: "Eventos y Alquileres",
      desc: "Organizá eventos, talleres y alquileres de espacios.",
      icon: "📅",
      href: "/semilla/eventos",
      image: "/semilla/eventos.png",
    },
  ];

  return (
    <div id="solutions" className="mt-16 w-full max-w-md">
      
      {/* TITULO */}
      <h2 className="text-2xl font-semibold text-[#2F4F2F] mb-2 text-center">
        Nuestras soluciones
      </h2>

      <p className="text-center text-[#5C6F5C] mb-6 px-4">
        Desarrollamos apps a medida para diferentes tipos de negocios.
      </p>

      {/* CARDS */}
      <div className="flex flex-col gap-6">
        {items.map((item, i) => {
          const Card = (
            <div className="relative">
              
              {/* IMAGE */}
              <div className="mx-3 rounded-2xl overflow-hidden h-40">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* CARD */}
              <div className="bg-white rounded-2xl p-4 shadow-lg -mt-10 mx-3 relative z-10">
                
                {/* ICON FLOAT */}
                <div className="absolute -top-6 left-4 w-12 h-12 rounded-xl bg-[#E8E6DC] flex items-center justify-center text-xl shadow-sm">
                  {item.icon}
                </div>

                <div className="mt-6">
                  <div className="text-[#2F4F2F] font-medium">
                    {item.title}
                  </div>
                  <div className="text-sm text-[#5C6F5C]">
                    {item.desc}
                  </div>
                </div>
              </div>
            </div>
          );

          if (item.href) {
            return (
              <Link key={i} href={item.href}>
                {Card}
              </Link>
            );
          }

          return <div key={i}>{Card}</div>;
        })}
      </div>
    </div>
  );
}