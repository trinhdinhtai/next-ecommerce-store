"use client"

import { useSearchParams } from "next/navigation"
import { Product } from "@/types"

import { defaultSort, sortOptions } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import PriceRangeSlider from "@/components/ui/price-range-slider"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Icons } from "@/components/Icons"
import PaginationButton from "@/components/pagination-button"
import ProductCard from "@/components/product/product-card"

interface ProductsProps extends React.HTMLAttributes<HTMLDivElement> {
  products: Product[]
  pageCount: number
}

export default function Products({
  products,
  pageCount,
  ...props
}: ProductsProps) {
  const searchParams = useSearchParams()

  const sort = searchParams?.get("sort") || defaultSort.slug

  return (
    <section className="flex flex-col space-y-6" {...props}>
      <div className="flex items-center space-x-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button aria-label="Filter products" size="sm">
              Filter
            </Button>
          </SheetTrigger>
          <SheetContent className="flex flex-col">
            <SheetHeader className="px-1">
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>

            <Separator />

            <div className="flex flex-1 flex-col gap-5 overflow-hidden px-1">
              <PriceRangeSlider />
            </div>

            <Separator className="my-4" />

            <SheetFooter>
              <Button size="sm" className="w-full">
                Clear Filters
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-label="Sort products" size="sm">
              Sort
              <Icons.chevronDown className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {sortOptions.map((option) => (
              <DropdownMenuItem
                key={option.title}
                className={cn(option.slug === sort && "font-bold")}
              >
                {option.title}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length ? <PaginationButton pageCount={pageCount} /> : null}
    </section>
  )
}
