import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import Navbar from "@/components/layout/navbar"

export default async function CartLayout({
  children,
}: React.PropsWithChildren) {
  const user = await currentUser()

  if (!user) {
    redirect("/sign-in")
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar user={user} />
      <main className="flex-1">{children}</main>
    </div>
  )
}
