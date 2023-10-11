import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Shell } from "@/components/ui/shell"
import { Skeleton } from "@/components/ui/skeleton"
import { PageHeader } from "@/components/page-header"

export default function CategoryLoading() {
  return (
    <Shell>
      <div className="flex gap-12">
        <div className="order-first w-full flex-none md:max-w-[225px]">
          <Skeleton className="h-6 w-full" />
          <Separator className="mt-1" />

          <div className="mt-8 flex flex-col gap-8">
            <div className="space-y-4">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-0.5 w-full" />

              <div className="flex items-center justify-between space-x-4">
                <Skeleton className="h-9 w-full" />
                <Skeleton className="h-1 w-4" />
                <Skeleton className="h-9 w-full" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-6">
          <PageHeader>
            <Skeleton className="h-9 w-36" />
            <Skeleton className="h-6 w-52" />
          </PageHeader>

          <div className="flex gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-10 w-28" />
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Card key={index} className="flex h-full flex-col rounded-xl">
                <CardHeader className="p-2">
                  <Skeleton className="aspect-square rounded-lg lg:aspect-[4/3]" />
                </CardHeader>

                <CardContent className="p-3">
                  <div className="space-y-2">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-5 w-1/2" />
                  </div>
                </CardContent>

                <CardFooter className="mt-auto p-3">
                  <Skeleton className="h-6 w-20" />
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="h-8 w-8 rounded-md" />
            ))}
          </div>
        </div>
      </div>
    </Shell>
  )
}
