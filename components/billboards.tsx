"use client"

import Image from "next/image"
import { Billboard as BillboardType } from "@/types"
import Slider from "react-slick"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

interface BillboardsProps {
  billboards: BillboardType[]
}

export default function Billboards({ billboards }: BillboardsProps) {
  return (
    <div className="overflow-hidden">
      <Slider
        dots
        infinite
        slidesToShow={1}
        slidesToScroll={1}
        autoplay
        pauseOnHover={false}
      >
        {billboards.map((billboard) => (
          <div
            key={billboard.id}
            style={{ backgroundImage: `url(${billboard?.imageUrl})` }}
            className="relative aspect-[3/2] overflow-hidden bg-cover md:aspect-[32/9]"
          >
            <Image
              key={billboard.id}
              src={billboard.imageUrl}
              fill
              alt="billboard"
              className="z-10 object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  )
}
