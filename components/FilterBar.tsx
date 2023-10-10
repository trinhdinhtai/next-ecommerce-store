"use client"

import Link from "next/link"

import { sortOptions } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export default function FilterBar() {
  return (
    <section className="sticky top-[68px] z-50 w-full shrink-0 overflow-hidden">
      <div className="flex gap-4">
        {sortOptions.map((option) => (
          <Link href="/" key={option.slug} scroll={false}>
            <div className={cn(buttonVariants({ variant: "link" }), "px-0")}>
              {option.title}
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
