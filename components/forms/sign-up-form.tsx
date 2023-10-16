"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { useSignUp } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { catchClerkError } from "@/lib/error"
import { authSchema } from "@/lib/validations/auth"
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
import { PasswordInput } from "@/components/password-input"

type FormInput = z.infer<typeof authSchema>

export default function SignUpForm() {
  const router = useRouter()
  const { isLoaded, signUp } = useSignUp()
  const [isPending, startTransition] = useTransition()

  const form = useForm<FormInput>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(data: FormInput) {
    if (!isLoaded) return

    startTransition(async () => {
      try {
        await signUp.create({
          emailAddress: data.email,
          password: data.password,
        })

        // Send email verification code
        await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        })

        router.push("/sign-up/verify-email")
        toast.message("Check your email", {
          description: "We sent you a 6-digit verification code.",
        })
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
                <Input type="text" placeholder="example@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="**********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending && <Icons.loading className="mr-2" aria-hidden="true" />}
          Sign up
          <span className="sr-only">Sign up</span>
        </Button>
      </form>
    </Form>
  )
}
