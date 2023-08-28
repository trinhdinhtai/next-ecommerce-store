"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Image as ImageType } from "@/types";
import Image from "next/image";

interface ProductDetailsCarousel {
  images: ImageType[];
}

const ProductDetailsCarousel = ({ images }: ProductDetailsCarousel) => {
  return (
    <div className="text-white text-[20px] md:col-span-5">
      <Carousel
        infiniteLoop={true}
        showIndicators={false}
        showStatus={false}
        thumbWidth={60}
        className="productCarousel"
        renderThumbs={() =>
          images.map((img, idx) => (
            <div key={idx} className="w-full aspect-square relative">
              <Image src={img.url} fill alt="logo" className="object-cover" />
            </div>
          ))
        }
      >
        {images.map((img, idx) => (
          <div key={idx} className="w-full aspect-square">
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
  );
};

export default ProductDetailsCarousel;
