import React, { HTMLAttributes } from "react"

import { cn } from "@/lib/utils"

export default function LoadingDots({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn(className, "space-x-[0.5px]")} {...props}>
      <span className="inline-flex animate-[loading_1.4s_ease-in-out_infinite] rounded-full">
        &bull;
      </span>
      <span className="inline-flex animate-[loading_1.4s_ease-in-out_0.2s_infinite] rounded-full">
        &bull;
      </span>
      <span className="inline-flex animate-[loading_1.4s_ease-in-out_0.4s_infinite] rounded-full">
        &bull;
      </span>
    </span>
  )
}
