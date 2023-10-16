"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { SignOutButton as ClerkSignOutButton } from "@clerk/nextjs"

import { cn } from "@/lib/utils"
import { useMounted } from "@/hooks/use-mounted"
import { Button, buttonVariants } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Icons } from "@/components/icons"

export default function SignOutButton() {
  const router = useRouter()
  const mounted = useMounted()
  const [isPending, startTransition] = useTransition()

  return (
    <div className="flex w-full items-center space-x-2">
      {mounted ? (
        <ClerkSignOutButton
          signOutCallback={() =>
            startTransition(() => {
              router.push(`${window.location.origin}/?redirect=false`)
            })
          }
        >
          <Button
            aria-label="Log out"
            size="sm"
            className="w-full"
            disabled={isPending}
          >
            {isPending && <Icons.loading className="mr-2" />}
            Log out
          </Button>
        </ClerkSignOutButton>
      ) : (
        <Skeleton
          className={cn(
            buttonVariants({ size: "sm" }),
            "w-full bg-muted text-muted-foreground"
          )}
        >
          Log out
        </Skeleton>
      )}

      <Button
        aria-label="Go back to the previous page"
        variant="outline"
        size="sm"
        className="w-full"
        onClick={() => router.back()}
        disabled={isPending}
      >
        Go back
      </Button>
    </div>
  )
}
