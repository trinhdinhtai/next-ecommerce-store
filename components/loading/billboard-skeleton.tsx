"use client";

import { Skeleton } from "@/components/ui/skeleton";

const BillboardSkeleton = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Skeleton className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover" />
    </div>
  );
};

export default BillboardSkeleton;
