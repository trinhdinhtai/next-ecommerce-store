import Link from "next/link"
import { User } from "@clerk/nextjs/server"

import { buttonVariants } from "@/components/ui/button"
import UserButton from "@/components/layout/navbar/user-button"
import { ThemeToggle } from "@/components/theme-toggle"

interface NavbarActionsProps {
  user: User | null
}

export default function NavbarActions({ user }: NavbarActionsProps) {
  return (
    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
      <ThemeToggle />

      {user ? (
        <UserButton user={user}/>
      ) : (
        <Link
          href="/sign-in"
          className={buttonVariants({
            size: "sm",
          })}
        >
          Sign In
          <span className="sr-only">Sign In</span>
        </Link>
      )}
    </div>
  )
}
