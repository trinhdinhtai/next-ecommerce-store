"use client";

import ProductInfo from "@/components/ProductInfo";
import ProductGallery from "@/components/gallery";
import Modal from "@/components/ui/modal";
import usePreviewModal from "@/hooks/usePreviewModal";

const PreviewModal = () => {
  const previewModal = usePreviewModal();
  const product = usePreviewModal((state) => state.data);

  if (!product) {
    return null;
  }

  return (
    <Modal
      isOpen={previewModal.isOpen}
      onClose={previewModal.onClose}
      title="Product Preview"
      description="Preview of the product"
    >
      <div className="grid grid-cols-1 items-start gap-x-6 gap-y-8 md:grid-cols-12 lg:gap-x-8">
        <ProductGallery images={product.images} />
        <ProductInfo product={product} />
      </div>
    </Modal>
  );
};

export default PreviewModal;
