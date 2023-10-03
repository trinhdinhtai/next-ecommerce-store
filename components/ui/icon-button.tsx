import { MouseEventHandler } from "react"

import { cn } from "@/lib/utils"

interface IconButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined
  icon: React.ReactElement
  className?: string
}

const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  icon,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center justify-center rounded-full border p-2 shadow-md transition hover:scale-110",
        className
      )}
    >
      {icon}
    </button>
  )
}

export default IconButton
