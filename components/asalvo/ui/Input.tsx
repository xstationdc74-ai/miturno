import clsx from "clsx"
import { forwardRef, InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={clsx(
          "h-12 w-full rounded-2xl border border-gray-200 bg-white px-4",
          "text-gray-900 placeholder:text-gray-400",
          "focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-100",
          "transition-all duration-200",
          className
        )}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"

export default Input