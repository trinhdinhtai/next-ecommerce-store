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
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
      ref={ref}
      disabled={isLoading}
    >
      <div className="w-8">
        {isLoading ? <LoadingDots className="mr-2" /> : icon}
      </div>

      {props.children}
    </Button>
  )
})
LoadingButton.displayName = "LoadingButton"

export default LoadingButton
