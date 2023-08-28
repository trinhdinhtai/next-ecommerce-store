import { getBillboards } from "@/actions/billboards";
import { getProducts } from "@/actions/products";
import Billboard from "@/components/Billboard";
import Products from "@/components/Products";
import Container from "@/components/ui/container";
import SectionHeading from "@/components/ui/section-heading";

export const revalidate = 0;

const HomePage = async () => {
  const responses = await Promise.all([
    getBillboards(),
    getProducts({ isFeatured: true }),
  ]);

  const billboards = responses[0];
  const products = responses[1];

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard billboards={billboards} />
        <SectionHeading title="New Products" />
        <Products title="New Products" products={products} />
      </div>
    </Container>
  );
};

export default HomePage;
