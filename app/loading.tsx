import SectionHeading from "@/components/ui/section-heading"
import BillboardSkeleton from "@/components/loading/billboard-skeleton"
import CategorySkeleton from "@/components/loading/category-skeleton"
import ProductsSkeleton from "@/components/loading/products-skeleton"

const Loading = () => {
  return (
    <div className="space-y-10 pb-10">
      <BillboardSkeleton />
      <CategorySkeleton />
      <SectionHeading title="New Products" />
      <ProductsSkeleton />
    </div>
  )
}

export default Loading
