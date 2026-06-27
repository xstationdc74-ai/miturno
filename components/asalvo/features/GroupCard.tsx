import Link from "next/link";
import { ChevronRight, MapPin, Users } from "lucide-react";

import Card from "@/components/asalvo/ui/Card";
import StatusBadge from "@/components/asalvo/ui/StatusBadge";

interface GroupCardProps {
  id: string;
  name: string;
  nickname: string;
  status: string;
}

export default function GroupCard({
  id,
  name,
  nickname,
  status,
}: GroupCardProps) {
  const arrived = status === "arrived";

  return (
    <Link href={`/asalvo/group/${id}`}>
      <Card
        className="
          rounded-3xl
          border
          border-slate-100
          bg-white
          shadow-sm
          transition-all
          duration-200
          hover:-translate-y-0.5
          hover:shadow-lg
        "
      >
        <div className="flex items-center justify-between">

          <div className="min-w-0 flex-1">

            <div className="mb-3 flex items-center justify-between">

              <StatusBadge
                variant={arrived ? "success" : "info"}
              >
                {arrived ? "Llegó" : "En camino"}
              </StatusBadge>

            </div>

            <h3 className="truncate text-lg font-bold text-slate-900">
              {name}
            </h3>

            <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">

              <MapPin
                size={16}
                className="text-slate-400"
              />

              <span className="truncate">
                {nickname}
              </span>

            </div>

            <div className="mt-3 flex items-center gap-2 text-sm text-slate-400">

              <Users size={15} />

              <span>3 participantes</span>

            </div>

          </div>

          <ChevronRight
            size={20}
            className="ml-4 text-slate-300"
          />

        </div>
      </Card>
    </Link>
  );
}