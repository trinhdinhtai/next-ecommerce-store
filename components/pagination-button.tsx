"use client"

import { useMemo } from "react"

import { defaultPage } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/Icons"

interface PaginationButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  pageCount: number
  page?: string
  per_page?: string
  sort?: string
  siblingCount?: number
}

export default function PaginationButton({
  pageCount,
  page,
  per_page,
  sort,
  siblingCount = 1,
  className,
  ...props
}: PaginationButtonProps) {
  const paginationRange = useMemo(() => {
    const delta = siblingCount + 2

    const range = []
    for (
      let i = Math.max(2, Number(page) - delta);
      i <= Math.min(pageCount - 1, Number(page) + delta);
      i++
    ) {
      range.push(i)
    }

    if (Number(page) - delta > 2) {
      range.unshift("...")
    }
    if (Number(page) + delta < pageCount - 1) {
      range.push("...")
    }

    range.unshift(1)
    if (pageCount !== 1) {
      range.push(pageCount)
    }

    return range
  }, [pageCount, page, siblingCount])

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-2",
        className
      )}
      {...props}
    >
      <Button
        variant="outline"
        size="icon"
        className="hidden h-8 w-8 lg:flex"
        disabled={Number(page) === Number(defaultPage)}
      >
        <Icons.doubleChevronLeft className="h-4 w-4" aria-hidden="true" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="hidden h-8 w-8 lg:flex"
        disabled={Number(page) === Number(defaultPage)}
      >
        <Icons.chevronLeft className="h-4 w-4" aria-hidden="true" />
      </Button>

      {paginationRange.map((pageNumber, index) =>
        pageNumber === "..." ? (
          <Button
            key={index}
            variant="outline"
            size="icon"
            className="h-8 w-8"
            disabled
          >
            ...
          </Button>
        ) : (
          <Button
            key={index}
            variant={Number(page) === pageNumber ? "default" : "outline"}
            size="icon"
            className="h-8 w-8"
          >
            {pageNumber}
          </Button>
        )
      )}

      <Button
        variant="outline"
        size="icon"
        className="hidden h-8 w-8 lg:flex"
        disabled={Number(page) === (pageCount ?? 10)}
      >
        <Icons.chevronRight className="h-4 w-4" aria-hidden="true" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="hidden h-8 w-8 lg:flex"
        disabled={Number(page) === (pageCount ?? 10)}
      >
        <Icons.doubleChevronRight className="h-4 w-4" aria-hidden="true" />
      </Button>
    </div>
  )
}
