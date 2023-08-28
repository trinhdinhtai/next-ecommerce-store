"use client";

import Image from "next/image";
import { Billboard } from "@/types";
import { Button } from "./ui/button";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface BillboardProps {
  billboards: Billboard[];
}

const Billboard = ({ billboards }: BillboardProps) => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 overflow-hidden">
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
            className="rounded-xl relative aspect-[3/2] md:aspect-[2.4/1] overflow-hidden bg-cover"
          >
            <div className="absolute left-10 top-2/4 -translate-y-2/4 text-[#212121] flex flex-col gap-6 z-20">
              <div className="font-bold text-3xl md:text-4xl lg:text-6xl sm:max-w-xl max-w-xs">
                {billboard.label}
              </div>
              <Button className="w-fit uppercase font-semibold text-sm md:text-base">
                Shop now
              </Button>
            </div>

            <Image
              key={billboard.id}
              src={billboard?.imageUrl as string}
              fill
              alt="billboard"
              className="object-cover z-10"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Billboard;
