"use client"

import Image from "next/image"
import { Billboard as BillboardType } from "@/types"
import Slider from "react-slick"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import { Button } from "@/components/ui/button"

interface BillboardProps {
  billboards: BillboardType[]
}

const Billboard = ({ billboards }: BillboardProps) => {
  return (
    <div className="overflow-hidden p-4 sm:p-6 lg:p-8">
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
            className="relative aspect-[3/2] overflow-hidden rounded-xl bg-cover md:aspect-[2.4/1]"
          >
            <div className="absolute left-10 top-2/4 z-20 flex -translate-y-2/4 flex-col gap-6 text-[#212121]">
              <div className="max-w-xs text-3xl font-bold sm:max-w-xl md:text-4xl lg:text-6xl">
                {billboard.label}
              </div>
              <Button className="w-fit text-sm font-semibold uppercase md:text-base">
                Shop now
              </Button>
            </div>

            <Image
              key={billboard.id}
              src={billboard?.imageUrl as string}
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

export default Billboard
