import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => {
  return (
    <div className="h-full w-full p-8">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          <Skeleton className="aspect-square rounded-xl" />
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <Skeleton className="aspect-square rounded-xl" />
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          <Skeleton className="aspect-square rounded-xl" />
          <Skeleton className="aspect-square rounded-xl" />
          <Skeleton className="aspect-square rounded-xl" />
        </div>
      </div>
    </div>
  )
}

export default Loading
