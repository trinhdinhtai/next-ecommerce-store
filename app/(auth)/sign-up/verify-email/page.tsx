import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Shell } from "@/components/ui/shell"
import VerifyEmailForm from "@/components/forms/verify-email-form"

export default function VerifyEmailPage() {
  return (
    <Shell className="max-w-xl">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Verify email</CardTitle>
          <CardDescription>
            Verify your email address to complete your account creation
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <VerifyEmailForm />
        </CardContent>
      </Card>
    </Shell>
  )
}
