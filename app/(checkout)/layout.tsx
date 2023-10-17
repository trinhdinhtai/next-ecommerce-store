import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

export default async function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await currentUser()

  if (!user) {
    redirect("/sign-in")
  }

  return <main>{children}</main>
}
