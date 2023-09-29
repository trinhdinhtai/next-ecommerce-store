"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Category } from "@/types"
import Slider from "react-slick"

import NextIcon from "./next-icon"
import PrevIcon from "./prev-icon"

interface CarouselProps {
  categories: Category[]
}

const CategoriesCarousel = ({ categories }: CarouselProps) => {
  const carouselSettings = {
    dots: false,
    infinite: true,
    draggable: false,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 10,
    rows: 2,
    autoplaySpeed: 8000,
    autoplay: true,
    prevArrow: <PrevIcon />,
    nextArrow: <NextIcon />,
  }
  return (
    <div className="">
      <Slider {...carouselSettings}>
        {categories?.map((category, i) => (
          <Link
            href={`category/${category.id}`}
            key={category.id}
            className="h-[160px] w-[120px] border p-2"
          >
            <div className="flex flex-col items-center justify-center">
              <div className="h-[70px] w-[70px] gap-4 rounded-full">
                <Image
                  src={`/categories/${i}.png`}
                  alt="category"
                  width={120}
                  height={150}
                />
              </div>
              <div className="font-sm m-2 w-[98%] text-center text-sm font-light">
                {category.name}
              </div>
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  )
}

export default CategoriesCarousel
