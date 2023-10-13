import React, { HTMLAttributes } from "react"

import { cn } from "@/lib/utils"

const dots = "mx-[1px] inline-block h-1 w-1 rounded-md"

export default function LoadingDots({
  className,
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className="inline-flex items-center">
      <span
        className={cn(
          dots,
          "animate-[loading_1.4s_ease-in-out_infinite]",
          className
        )}
      />
      <span
        className={cn(
          dots,
          "animate-[loading_1.4s_ease-in-out_0.2s_infinite]",
          className
        )}
      />
      <span
        className={cn(
          dots,
          "animate-[loading_1.4s_ease-in-out_infinite]",
          className
        )}
      />
    </span>
  )
}
