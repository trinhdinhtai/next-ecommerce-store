import { CartLineItem } from "@/types"

interface CartLineItemsProps extends React.HTMLAttributes<HTMLDivElement> {
  cartItems: CartLineItem[]
  isScrollable?: boolean
  isEditable?: boolean
  variant?: "default" | "minimal"
}

export default function CartLineItems({
  cartItems,
  isScrollable = true,
  isEditable = true,
  variant = "default",
  className,
  ...props
}: CartLineItemsProps) {
  return <div>CartLineItems</div>
}
