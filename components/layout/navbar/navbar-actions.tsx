import { User } from "lucide-react"

import { Button } from "@/components/ui/button"
import CartButton from "@/components/cart-button"
import { ThemeToggle } from "@/components/theme-toggle"

const NavbarActions = () => {
  return (
    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
      <ThemeToggle />
      <CartButton />
      <Button variant="ghost" className="px-3">
        <User size={24} />
      </Button>
    </div>
  )
}

export default NavbarActions
