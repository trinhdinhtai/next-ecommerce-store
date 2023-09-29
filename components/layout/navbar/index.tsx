import Link from "next/link"

import LogoIcon from "@/components/icons/logo"

import Container from "../../ui/container"
import NavbarActions from "./navbar-actions"
import Search from "./search"

const Navbar = () => {
  return (
    <div className="sticky left-0 top-0 z-20 border-b bg-background">
      <Container>
        <div className="relative flex h-16 items-center justify-between p-4 dark:text-white sm:px-6 lg:px-8">
          <Link href="/">
            <LogoIcon className="h-8" />
          </Link>

          <Search />

          <NavbarActions />
        </div>
      </Container>
    </div>
  )
}

export default Navbar
