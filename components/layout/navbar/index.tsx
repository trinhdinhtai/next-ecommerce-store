import Link from "next/link"
import { User } from "@clerk/nextjs/server"

import LogoIcon from "@/components/icons/logo"
import NavbarActions from "@/components/layout/navbar/navbar-actions"

interface NavbarProps {
  user: User | null
}

export default function Navbar({ user }: NavbarProps) {
  return (
    <div className="sticky left-0 top-0 z-20 border-b bg-background">
      <div className="container relative flex h-16 items-center justify-between p-4 dark:text-white">
        <Link href="/">
          <LogoIcon className="h-8" />
        </Link>

        <NavbarActions user={user} />
      </div>
    </div>
  )
}
