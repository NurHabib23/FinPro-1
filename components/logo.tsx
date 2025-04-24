import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  variant?: "default" | "light" | "dark"
  size?: "sm" | "md" | "lg"
}

export function Logo({ className, variant = "default", size = "md" }: LogoProps) {
  // Define colors based on variant
  const colors = {
    default: {
      primary: "text-blue-600",
      secondary: "text-gray-800",
    },
    light: {
      primary: "text-blue-300",
      secondary: "text-white",
    },
    dark: {
      primary: "text-blue-800",
      secondary: "text-gray-900",
    },
  }[variant]

  // Define sizes
  const sizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  }[size]

  return (
    <div className={cn("font-bold flex items-center", sizes, className)}>
      <span className={colors.primary}>Link</span>
      <span className={colors.secondary}>Pro</span>
      <span className={colors.primary} aria-hidden="true">
        •
      </span>
    </div>
  )
}
