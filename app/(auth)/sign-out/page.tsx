import { Shell } from "@/components/ui/shell"
import SignOutButton from "@/components/auth/sign-out-button"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"

export default function SignOutPage() {
  return (
    <Shell className="max-w-xs rounded-lg bg-background">
      <PageHeader
        id="sign-out-page-header"
        aria-labelledby="sign-out-page-header-heading"
        className="text-center"
      >
        <PageHeaderHeading size="sm">Sign out</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Are you sure you want to sign out?
        </PageHeaderDescription>
      </PageHeader>
      <SignOutButton />
    </Shell>
  )
}
