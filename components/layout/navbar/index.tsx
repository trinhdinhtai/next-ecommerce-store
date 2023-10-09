import Link from "next/link"

import LogoIcon from "@/components/icons/logo"

import NavbarActions from "./navbar-actions"
import Search from "./search"

const Navbar = () => {
  return (
    <div className="sticky left-0 top-0 z-20 border-b bg-background">
      <div className="container relative flex h-16 items-center justify-between p-4 dark:text-white">
        <Link href="/">
          <LogoIcon className="h-8" />
        </Link>

        <Search />

        <NavbarActions />
      </div>
    </div>
  )
}

export default Navbar
