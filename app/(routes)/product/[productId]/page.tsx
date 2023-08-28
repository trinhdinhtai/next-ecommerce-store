import { getProductById, getProducts } from "@/actions/products";
import ProductInfo from "@/components/ProductInfo";
import SuggestProductsList from "@/components/SuggestProductsList";
import ProductGallery from "@/components/gallery";
import Container from "@/components/ui/container";

interface ProductIdPageProps {
  params: {
    productId: string;
  };
}

const ProductIdPage = async ({ params }: ProductIdPageProps) => {
  const product = await getProductById(params.productId);
  const productsByCategoryId = await getProducts({
    categoryId: product?.category?.id,
  });

  const suggestProducts = productsByCategoryId.filter(
    (product) => product.id !== params.productId
  );

  if (!product) {
    return null;
  }

  return (
    <div>
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-x-6 gap-y-8 md:grid-cols-12 lg:gap-x-12">
            <ProductGallery images={product.images} />
            <ProductInfo product={product} />
          </div>
          <hr className="my-10" />
          <SuggestProductsList
            title="Related Items"
            products={suggestProducts}
          />
        </div>
      </Container>
    </div>
  );
};

export default ProductIdPage;
