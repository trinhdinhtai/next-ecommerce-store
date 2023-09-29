"use client"

import { Skeleton } from "@/components/ui/skeleton"

const BillboardSkeleton = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Skeleton className="relative aspect-square overflow-hidden rounded-xl bg-cover md:aspect-[2.4/1]" />
    </div>
  )
}

export default BillboardSkeleton
