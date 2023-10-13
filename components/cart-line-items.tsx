import Image from "next/image"
import type { CartLineItem } from "@/types"
import { Slot } from "@radix-ui/react-slot"

import { formatPrice } from "@/lib/formatter"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Icons } from "@/components/Icons"

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
    <Wrapper className="h-full">
      <div
        className={cn(
          "flex w-full flex-col gap-5",
          isScrollable && "pr-6",
          className
        )}
        {...props}
      >
        {cartItems.map((cartItem) => (
          <div key={cartItem.id} className="space-y-3">
            <div
              className={cn(
                "flex items-start justify-between gap-4",
                isEditable && "xs:flex-row flex-col"
              )}
            >
              <div className="flex items-center space-x-4">
                {variant === "default" ? (
                  <div className="relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded">
                    {cartItem.product?.images.length ? (
                      <Image
                        src={cartItem.product.images[0].url}
                        alt={cartItem.product.name}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        fill
                        className="absolute object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-secondary">
                        <Icons.placeholder
                          className="h-4 w-4 text-muted-foreground"
                          aria-hidden="true"
                        />
                      </div>
                    )}
                  </div>
                ) : null}

                <div className="flex flex-col space-y-1 self-start">
                  <span className="line-clamp-1 text-sm font-medium">
                    {cartItem.product.name}
                  </span>

                  {isEditable ? (
                    <span className="line-clamp-1 text-xs text-muted-foreground">
                      {formatPrice(cartItem.product.price.toNumber())} x{" "}
                      {cartItem.quantity} ={" "}
                      {formatPrice(
                        (
                          Number(cartItem.product.price) *
                          Number(cartItem.quantity)
                        ).toFixed(2)
                      )}
                    </span>
                  ) : (
                    <span className="line-clamp-1 text-xs text-muted-foreground">
                      Qty {cartItem.quantity}
                    </span>
                  )}

                  {variant === "default" ? (
                    <span className="line-clamp-1 text-xs capitalize text-muted-foreground">
                      {`${cartItem.product.category.name}`}
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
            {variant === "default" ? <Separator /> : null}
          </div>
        ))}
      </div>
    </Wrapper>
  )
}
