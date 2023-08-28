import GalleryTab from "@/components/gallery/GalleryTab";
import { Image as ImageType } from "@/types";
import { Tab } from "@headlessui/react";
import Image from "next/image";

interface ProductGalleryProps {
  images: ImageType[];
}

const ProductGallery = ({ images }: ProductGalleryProps) => {
  return (
    <div className="md:col-span-5">
      <Tab.Group as="div" className="flex flex-col-reverse">
        <div className="mx-auto mt-6 w-full max-w-2xl hidden md:block lg:max-w-none">
          <Tab.List className="grid grid-cols-4 gap-6">
            {images.map((image) => (
              <GalleryTab key={image.id} image={image} />
            ))}
          </Tab.List>
        </div>
        <Tab.Panels className="aspect-square w-full">
          {images.map((image) => (
            <Tab.Panel key={image.id}>
              <div className="aspect-square relative h-full w-full sm:rounded-lg overflow-hidden">
                <Image
                  fill
                  src={image.url}
                  alt="Image"
                  className="object-cover object-center"
                />
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default ProductGallery;
