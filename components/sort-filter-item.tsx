import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"

import { SortFilterItem as SortItem } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { useQueryString } from "@/hooks/use-query-string"
import { buttonVariants } from "@/components/ui/button"

interface SortFilterItemProps {
  item: SortItem
}

export default function SortFilterItem({ item }: SortFilterItemProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { createQueryString } = useQueryString()

  const active = searchParams.get("sort") === item.slug
  const href = `${pathname}?${createQueryString({ sort: item.slug })}`

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
