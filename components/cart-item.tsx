import Image from "next/image"
import { CartLineItem } from "@/types"
import { ImageIcon } from "lucide-react"

import { formatPrice } from "@/lib/formatter"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import DeleteItemButton from "@/components/delete-item-button"
import EditCartItemQuantity from "@/components/edit-cart-item-quantity"

interface CartItemProps extends React.HTMLAttributes<HTMLDivElement> {
  cartItem: CartLineItem
  isEditable?: boolean
  variant?: "default" | "minimal"
}

export default function CartItem({
  className,
  cartItem,
  isEditable,
  variant,
}: CartItemProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <div
        key={cartItem.id}
        className={cn(
          "flex items-start justify-between gap-4 px-1 py-4",
          isEditable && "flex-col sm:flex-row"
        )}
      >
        <div className="flex items-center space-x-6">
          {variant === "default" ? (
            <div className="relative aspect-square h-16 w-16 min-w-fit rounded">
              <div className="absolute z-40 -mt-2 ml-[55px]">
                <DeleteItemButton cartItem={cartItem} />
              </div>
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
                  <ImageIcon
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
                {formatPrice(Number(cartItem.product.price))}
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

        <div className="flex flex-col gap-2">
          <span className="text-right text-sm">
            {formatPrice(
              (
                Number(cartItem.product.price) * Number(cartItem.quantity)
              ).toFixed(2)
            )}
          </span>

          {isEditable ? (
            <EditCartItemQuantity cartLineItem={cartItem} />
          ) : (
            <div className="flex flex-col space-y-1 font-medium">
              <span className="ml-auto line-clamp-1 text-sm">
                {formatPrice(
                  (Number(cartItem.product.price) * cartItem.quantity).toFixed(
                    2
                  )
                )}
              </span>
              <span className="line-clamp-1 text-xs text-muted-foreground">
                {formatPrice(Number(cartItem.product.price))} each
              </span>
            </div>
          )}
        </div>
      </div>
      {variant === "default" ? <Separator /> : null}
    </div>
  )
}
