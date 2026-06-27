import { Plus } from "lucide-react";

interface FloatingButtonProps {
  onClick?: () => void;
}

export default function FloatingButton({
  onClick,
}: FloatingButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label="Crear grupo"
      className="
        fixed
        bottom-20
        right-5
        z-50
        flex
        h-14
        w-14
        items-center
        justify-center
        rounded-full
        bg-emerald-600
        text-white
        shadow-[0_10px_30px_rgba(16,185,129,0.35)]
        transition-all
        duration-200
        hover:scale-105
        active:scale-95
      "
    >
      <Plus
        size={26}
        strokeWidth={2.5}
      />
    </button>
  );
}