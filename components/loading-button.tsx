"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { useMounted } from "@/hooks/use-mounted"
import { Button, ButtonProps, buttonVariants } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import LoadingDots from "@/components/loading-dots"

const LoadingButton = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & {
    isLoading: boolean
    icon?: React.ReactNode
  }
>(({ className, variant, size, isLoading, icon, ...props }, ref) => {
  const mounted = useMounted()

  if (!mounted)
    return (
      <Skeleton
        className={cn(
          buttonVariants({ variant, size, className }),
          "bg-muted text-muted-foreground"
        )}
      >
        {props.children}
      </Skeleton>
    )

  return (
    <Button
      className={cn(
        buttonVariants({ variant, size, className }),
        "relative px-16"
      )}
      {...props}
      ref={ref}
      disabled={isLoading}
    >
      <div className="absolute left-4 flex items-center justify-center">
        {isLoading ? <LoadingDots className="bg-white dark:bg-black" /> : icon}
      </div>

      {props.children}
    </Button>
  )
})
LoadingButton.displayName = "LoadingButton"

export default LoadingButton
