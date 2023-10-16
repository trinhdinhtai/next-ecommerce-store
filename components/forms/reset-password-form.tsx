"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { useSignIn } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { catchClerkError } from "@/lib/error"
import { checkEmailSchema } from "@/lib/validations/auth"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"

type FormInput = z.infer<typeof checkEmailSchema>

export default function ResetPasswordForm() {
  const router = useRouter()
  const { isLoaded, signIn } = useSignIn()
  const [isPending, startTransition] = useTransition()

  const form = useForm<FormInput>({
    resolver: zodResolver(checkEmailSchema),
    defaultValues: {
      email: "",
    },
  })

  function onSubmit(data: FormInput) {
    if (!isLoaded) return

    startTransition(async () => {
      try {
        const firstFactor = await signIn.create({
          strategy: "reset_password_email_code",
          identifier: data.email,
        })

        if (firstFactor.status === "needs_first_factor") {
          router.push("/sign-in/reset-password/step2")
          toast.message("Check your email", {
            description: "We sent you a 6-digit verification code.",
          })
        }
      } catch (err) {
        catchClerkError(err)
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending && <Icons.loading className="mr-2" aria-hidden="true" />}
          Continue
          <span className="sr-only">
            Continue to reset password verification
          </span>
        </Button>
      </form>
    </Form>
  )
}
