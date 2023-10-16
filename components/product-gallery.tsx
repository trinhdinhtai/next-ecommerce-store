"use client"

import Image from "next/image"
import { Image as ImageType } from "@/types"
import { Tab } from "@headlessui/react"

import GalleryTab from "@/components/gallery-tab"

interface ProductGalleryProps {
  images: ImageType[]
}

const ProductGallery = ({ images }: ProductGalleryProps) => {
  return (
    <div className="md:col-span-5">
      <Tab.Group as="div" className="flex flex-col-reverse">
        <div className="mx-auto mt-6 hidden w-full max-w-2xl md:block lg:max-w-none">
          <Tab.List className="grid grid-cols-4 gap-6">
            {images.map((image) => (
              <GalleryTab key={image.id} image={image} />
            ))}
          </Tab.List>
        </div>
        <Tab.Panels className="aspect-square w-full">
          {images.map((image) => (
            <Tab.Panel key={image.id}>
              <div className="relative aspect-square h-full w-full overflow-hidden sm:rounded-lg">
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
  )
}

export default ProductGallery
