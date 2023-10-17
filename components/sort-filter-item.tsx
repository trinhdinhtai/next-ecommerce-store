import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"

import { SortFilterItem as SortItem } from "@/lib/constants"
import { createUrl } from "@/lib/url"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

interface SortFilterItemProps {
  item: SortItem
}

export default function SortFilterItem({ item }: SortFilterItemProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const active = searchParams.get("sort") === item.slug
  const q = searchParams.get("q")

  const href = createUrl(
    pathname,
    new URLSearchParams({
      ...(q && { q }),
      ...(item?.slug?.length && { sort: item.slug }),
    })
  )

  return (
    <Link
      href={href}
      key={item.slug}
      scroll={false}
      className={cn(
        buttonVariants({ variant: "link" }),
        "px-0",
        active && "underline underline-offset-4"
      )}
    >
      {item.title}
    </Link>
  )
}
