import Avatar from "@/components/asalvo/ui/Avatar";
import { Bell } from "lucide-react";

interface HeaderProps {
  title: string;
  subtitle?: string;
  avatarUrl?: string | null;
}

export default function Header({
  title,
  subtitle,
  avatarUrl,
}: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-5 pt-4 pb-4">

      <div className="flex items-center gap-3">

        <Avatar
          src={avatarUrl}
          size="sm"
        />

        <div className="leading-tight">

          <h1 className="text-[18px] font-bold tracking-[-0.02em] text-slate-900">
            {title}
          </h1>

          {subtitle && (
            <p className="mt-1 text-sm text-slate-500">
              {subtitle}
            </p>
          )}

        </div>

      </div>

      <button
        className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-slate-100"
        aria-label="Notificaciones"
      >
        <Bell
          size={20}
          strokeWidth={2}
          className="text-slate-700"
        />
      </button>

    </header>
  );
}