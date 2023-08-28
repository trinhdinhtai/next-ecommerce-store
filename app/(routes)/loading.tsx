import BillboardSkeleton from "@/components/loading/billboard-skeleton";
import ProductsSkeleton from "@/components/loading/products-skeleton";
import Container from "@/components/ui/container";
import SectionHeading from "@/components/ui/section-heading";

const Loading = () => {
  return (
    <Container>
      <div className="space-y-10 pb-10">
        <BillboardSkeleton />
        <SectionHeading title="New Products" />
        <ProductsSkeleton />
      </div>
    </Container>
  );
};

export default Loading;
