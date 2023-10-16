// Based on the fantastic https://vercel.com/design/loading-dots

import { HTMLAttributes } from "react"

import { cn } from "@/lib/utils"

interface LoadingDotsProps extends HTMLAttributes<HTMLSpanElement> {}

export default function LoadingDots({ className, ...props }: LoadingDotsProps) {
  return (
    <span className={cn("space-x-[0.5px]", className)} {...props}>
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
