"use client";

import { Skeleton } from "@/components/ui/skeleton";

const CategorySkeleton = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="w-full overflow-hidden flex py-2 gap-6">
        {new Array(3).fill(0).map((_, i) => (
          <Skeleton key={i} className="min-w-[350px] rounded-lg h-[106px]" />
        ))}
      </div>
    </div>
  );
};

export default CategorySkeleton;
