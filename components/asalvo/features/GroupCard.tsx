import Link from "next/link";
import {
  ChevronRight,
} from "lucide-react";

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
  return (
    <Link href={`/asalvo/group/${id}`}>
      <Card className="transition hover:shadow-md">
        <div className="flex items-center justify-between">

          <div className="space-y-2">

            <h3 className="text-lg font-semibold">
              {name}
            </h3>

            <p className="text-sm text-gray-500">
              {nickname}
            </p>

            <StatusBadge
              variant={
                status === "arrived"
                  ? "success"
                  : "info"
              }
            >
              {status}
            </StatusBadge>

          </div>

          <ChevronRight
            className="text-gray-300"
            size={22}
          />

        </div>
      </Card>
    </Link>
  );
}