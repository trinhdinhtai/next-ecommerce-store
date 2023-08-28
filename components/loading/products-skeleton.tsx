"use client";

import { Skeleton } from "@/components/ui/skeleton";

const ProductsSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Skeleton className="aspect-square rounded-xl" />
          <Skeleton className="aspect-square rounded-xl" />
          <Skeleton className="aspect-square rounded-xl" />
          <Skeleton className="aspect-square rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default ProductsSkeleton;
