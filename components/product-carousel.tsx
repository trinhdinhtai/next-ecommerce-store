"use client"

import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader

import Image from "next/image"
import { Image as ImageType } from "@/types"
import { Carousel } from "react-responsive-carousel"

interface ProductDetailsCarousel {
  images: ImageType[]
}

export default function ProductCarousel({ images }: ProductDetailsCarousel) {
  return (
    <div className="text-[20px] text-white md:col-span-5">
      <Carousel
        infiniteLoop={true}
        showIndicators={false}
        showStatus={false}
        thumbWidth={60}
        className="productCarousel"
        renderThumbs={() =>
          images.map((img, idx) => (
            <div key={idx} className="relative aspect-square w-full">
              <Image src={img.url} fill alt="logo" className="object-cover" />
            </div>
          ))
        }
      >
        {images.map((img, idx) => (
          <div key={idx} className="aspect-square w-full">
            <Image
              src={img.url}
              layout="fill"
              alt="logo"
              className="object-cover"
            />
          </div>
        ))}
      </Carousel>
    </div>
  )
}
