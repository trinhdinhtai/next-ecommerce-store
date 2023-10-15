import type { CartLineItem } from "@/types"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import CartItem from "@/components/cart/cart-item"

interface CartLineItemsProps extends React.HTMLAttributes<HTMLDivElement> {
  cartItems: CartLineItem[]
  isScrollable?: boolean
  isEditable?: boolean
  variant?: "default" | "minimal"
}

export function CartLineItems({
  cartItems,
  isScrollable = true,
  isEditable = true,
  variant = "default",
  className,
  ...props
}: CartLineItemsProps) {
  const Wrapper = isScrollable ? ScrollArea : Slot

  return (
    <Wrapper className={cn(className, "h-full")}>
      <div
        className={cn("flex w-full flex-col gap-5", isScrollable && "pr-6")}
        {...props}
      >
        {cartItems.map((cartItem) => (
          <CartItem
            key={cartItem.id}
            cartItem={cartItem}
            isEditable={isEditable}
            variant={variant}
          />
        ))}
      </div>
    </Wrapper>
  )
}
