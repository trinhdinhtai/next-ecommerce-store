import { Card } from "@/components/ui/card"
import { Shell } from "@/components/ui/shell"
import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => {
  return (
    <Shell>
      <Skeleton className="h-[414px] w-full" />

      <Skeleton className="h-9 w-40" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <Card
            key={index}
            className="flex flex-col items-center gap-2 rounded-md p-6"
          >
            <Skeleton className="h-20 w-20 rounded-full" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-16" />
          </Card>
        ))}
      </div>

      <Skeleton className="h-9 w-40" />

      <div className="flex flex-col gap-y-8">
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Card
                key={index}
                className="flex flex-col items-center gap-2 rounded-md p-6"
              >
                <Skeleton className="h-20 w-20 rounded-full" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-16" />
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  )
}

export default Loading
