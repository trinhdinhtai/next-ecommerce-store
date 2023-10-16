import Link from "next/link"
import { User } from "@clerk/nextjs/server"
import {
  AvatarIcon,
  DashboardIcon,
  ExitIcon,
  GearIcon,
} from "@radix-ui/react-icons"

import { getAvatarFallback, getUserEmail } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface UserButtonProps {
  user: User
}

export default function UserButton({ user }: UserButtonProps) {
  const fullName = `${user.firstName} ${user.lastName}`
  const email = getUserEmail(user)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.imageUrl} alt={user.username ?? ""} />
            <AvatarFallback>{getAvatarFallback(fullName)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/account">
              <AvatarIcon className="mr-2 h-4 w-4" aria-hidden="true" />
              Account
              <DropdownMenuShortcut>⇧⌘A</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/stores">
              <DashboardIcon className="mr-2 h-4 w-4" aria-hidden="true" />
              Dashboard
              <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild disabled>
            <Link href="/dashboard/settings">
              <GearIcon className="mr-2 h-4 w-4" aria-hidden="true" />
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/sign-out">
            <ExitIcon className="mr-2 h-4 w-4" aria-hidden="true" />
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
