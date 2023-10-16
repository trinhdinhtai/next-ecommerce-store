"use client"

import { useState } from "react"
import { isClerkAPIResponseError, useSignIn } from "@clerk/nextjs"
import { OAuthStrategy } from "@clerk/types"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

const oauthProviders = [
  { name: "Google", strategy: "oauth_google", icon: "google" },
  { name: "Facebook", strategy: "oauth_facebook", icon: "facebook" },
  { name: "Github", strategy: "oauth_github", icon: "github" },
] satisfies {
  name: string
  icon: keyof typeof Icons
  strategy: OAuthStrategy
}[]

export default function OAuthSignIn() {
  const [selectedStrategy, setSelectedStrategy] =
    useState<OAuthStrategy | null>(null)

  const { signIn, isLoaded: signInLoaded } = useSignIn()

  async function oauthSignIn(strategy: OAuthStrategy) {
    if (!signInLoaded) return

    try {
      setSelectedStrategy(strategy)
      await signIn.authenticateWithRedirect({
        strategy: strategy,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      })
    } catch (error) {
      const unknownError = "Something went wrong, please try again."

      isClerkAPIResponseError(error)
        ? toast.error(error.errors[0]?.longMessage ?? unknownError)
        : toast.error(unknownError)
    } finally {
      setSelectedStrategy(null)
    }
  }

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-4">
      {oauthProviders.map(({ name, strategy, icon }) => {
        const Icon = Icons[icon]
        return (
          <Button
            key={strategy}
            aria-label={`Sign in with ${name}`}
            variant="outline"
            className="w-full bg-background sm:w-auto"
            onClick={() => oauthSignIn(strategy)}
            disabled={selectedStrategy !== null}
          >
            {selectedStrategy === strategy ? (
              <Icons.loading className="mr-2" aria-hidden="true" />
            ) : (
              <Icon className="mr-2 h-4 w-4" aria-hidden="true" />
            )}
            {name}
          </Button>
        )
      })}
    </div>
  )
}
