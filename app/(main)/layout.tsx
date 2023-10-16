import { currentUser } from "@clerk/nextjs"

import Navbar from "@/components/layout/navbar"

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await currentUser()

  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar user={user} />
      <main className="flex-1">{children}</main>
    </div>
  )
}
