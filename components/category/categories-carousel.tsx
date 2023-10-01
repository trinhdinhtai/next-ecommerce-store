"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Category } from "@/types"
import Slider from "react-slick"

import NextIcon from "@/components/slick/next-icon"
import PrevIcon from "@/components/slick/prev-icon"

interface CarouselProps {
  categories: Category[]
}

const CategoriesCarousel = ({ categories }: CarouselProps) => {
  const lengthCategories = categories.length
  const carouselSettings = {
    dots: false,
    infinite: true,
    draggable: false,
    speed: 500,
    slidesToShow: lengthCategories < 10 ? 3 : 10,
    slidesToScroll: lengthCategories < 10 ? 3 : 10,
    rows: lengthCategories < 10 ? 1 : 2,
    autoplaySpeed: 8000,
    autoplay: false,
    prevArrow: <PrevIcon />,
    nextArrow: <NextIcon />,
  }

  return (
    <div className="">
      <Slider {...carouselSettings}>
        {categories?.map((category) => (
          <Link
            href={`categories/${category.id}`}
            key={category.id}
            className="h-[160px] w-[120px] border p-2"
          >
            <div className="mt-2 flex flex-col items-center justify-center">
              <div className="relative h-[70px] w-[70px] gap-4 rounded-md">
                <Image
                  src={category.imageUrl}
                  alt="category"
                  className="rounded-md border object-cover"
                  fill
                />
              </div>
              <div className="font-sm m-2 w-[98%] text-center text-sm font-normal">
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
