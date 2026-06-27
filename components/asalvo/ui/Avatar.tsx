import Image from "next/image"
import clsx from "clsx"

interface AvatarProps {
  src?: string | null
  alt?: string
  size?: "sm" | "md" | "lg"
  className?: string
}

const sizes = {
  sm: "h-10 w-10",
  md: "h-12 w-12",
  lg: "h-16 w-16",
}

export default function Avatar({
  src,
  alt = "Avatar",
  size = "md",
  className,
}: AvatarProps) {
  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-full bg-gray-100",
        sizes[size],
        className
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-gray-400">
          👤
        </div>
      )}
    </div>
  )
}