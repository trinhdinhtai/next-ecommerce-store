"use client"

import React, { ReactNode } from "react"
import Image from "next/image"
import { Billboard as BillboardType } from "@/types"
import Slider from "react-slick"

import { Button } from "./ui/button"

interface BillboardProps {
  billboards: BillboardType[]
}

const Billboard = ({ billboards }: BillboardProps) => {
  const carouselSettings = {
    dots: true,
    infinite: true,
    draggable: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    rows: 1,
    autoplaySpeed: 8000,
    autoplay: true,
    prevArrow: <div className="hidden"></div>,
    nextArrow: <div className="hidden"></div>,
    appendDots: (dots: ReactNode[]) => (
      <div className="p-8">
        <ul>{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div className="bg-gray-30 relative h-[14px] w-[14px] rounded-full"></div>
    ),
  }
  return (
    <Slider {...carouselSettings} className="h-1/2">
      {billboards.map((billboard) => (
        <div
          key={billboard.id}
          style={{ backgroundImage: `url(${billboard?.imageUrl})` }}
          className="relative aspect-[3/2] overflow-hidden rounded-xl bg-cover opacity-80 md:aspect-[2.4/1]"
        >
          <div className="absolute left-10 top-2/3 z-20 flex -translate-y-2/4 flex-col text-[#fff]">
            <div className="mb-3 max-w-xs gap-6 text-3xl font-bold sm:max-w-xl md:text-4xl">
              {billboard.label}
            </div>
            <Button className="w-fit rounded text-sm font-semibold md:text-base">
              Shop now
            </Button>
          </div>

          <Image
            key={billboard.id}
            src={billboard?.imageUrl as string}
            fill
            alt="billboard"
            className="z-10 object-fill"
          />
        </div>
      ))}
    </Slider>
  )
}

export default Billboard
