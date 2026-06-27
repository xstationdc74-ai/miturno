import Avatar from "@/components/asalvo/ui/Avatar"

interface HeaderProps {
  title: string
  subtitle?: string
  avatarUrl?: string | null
}

export default function Header({
  title,
  subtitle,
  avatarUrl,
}: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 pt-8 pb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-1 text-sm text-gray-500">
            {subtitle}
          </p>
        )}
      </div>

      <Avatar
        src={avatarUrl}
        size="md"
      />
    </header>
  )
}