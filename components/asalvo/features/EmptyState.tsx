import Button from "@/components/asalvo/ui/Button";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel: string;
  onAction?: () => void;
}

export default function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">

      <div className="mb-5 text-5xl">
        🌱
      </div>

      <h3 className="text-xl font-semibold">
        {title}
      </h3>

      <p className="mt-2 mb-6 text-slate-500">
        {description}
      </p>

      <Button
        onClick={onAction}
        fullWidth
      >
        {actionLabel}
      </Button>

    </div>
  );
}