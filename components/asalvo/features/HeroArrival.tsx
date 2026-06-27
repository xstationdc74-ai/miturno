import Button from "@/components/asalvo/ui/Button";
import Card from "@/components/asalvo/ui/Card";
import { Clock3, Users } from "lucide-react";

interface HeroArrivalProps {
  status: "active" | "idle" | "invite";
  title: string;
  subtitle: string;
  onClick?: () => void;
}

export default function HeroArrival({
  status,
  title,
  subtitle,
  onClick,
}: HeroArrivalProps) {
  const config = {
  active: {
    badge: "EN CAMINO",
    image: "/asalvo/hero/journey.png",
  },
  idle: {
    badge: "TODO TRANQUILO",
    image: "/asalvo/hero/safe.png",
  },
  invite: {
    badge: "INVITACIÓN",
    image: "/asalvo/hero/invitation.png",
  },
};

  const current = config[status];

  return (
    <Card className="relative mb-6 overflow-hidden rounded-3xl border-0 p-0 shadow-lg">

      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${current.image})`,
        }}
      />

      {/* Overlay suave para mejorar la lectura */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Contenido */}
      <div className="relative z-10 flex min-h-[270px] flex-col justify-between p-6 text-white">

        <div>

          <span className="inline-flex rounded-full bg-white/20 px-4 py-1 text-xs font-semibold backdrop-blur-sm">
            {current.badge}
          </span>

        </div>

        <div className="space-y-4">

          <div>

            <h2 className="text-3xl font-bold leading-tight">
              {title}
            </h2>

            <p className="mt-1 text-sm text-white/90">
              {subtitle}
            </p>

          </div>

          <div className="flex gap-6 text-sm">

            <div className="flex items-center gap-2">

              <Clock3 size={18} />

              <span>22:30</span>

            </div>

            <div className="flex items-center gap-2">

              <Users size={18} />

              <span>3 participantes</span>

            </div>

          </div>

          <Button
            variant="secondary"
            fullWidth
            onClick={onClick}
          >
            Entrar al grupo
          </Button>

        </div>

      </div>

    </Card>
  );
}