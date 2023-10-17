"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { useMounted } from "@/hooks/use-mounted"
import {
  Button,
  buttonVariants,
  type ButtonProps,
} from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import LoadingDots from "@/components/loading-dots"

const LoadingButton = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & {
    isLoading: boolean
    icon?: React.ReactNode
    dotClassName?: string
  }
>(
  (
    { id, className, dotClassName, variant, size, isLoading, icon, ...props },
    ref
  ) => {
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
        id={id}
        className={className}
        {...props}
        variant={variant}
        size={size}
        ref={ref}
        disabled={isLoading}
      >
        {isLoading ? <LoadingDots className={dotClassName} /> : icon}
        {props.children}
      </Button>
    )
  }
)
LoadingButton.displayName = "LoadingButton"

export default LoadingButton
