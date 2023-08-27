"use client";

import { Billboard } from "@/types";
import { Button } from "./ui/button";

interface BillboardProps {
  billboards: Billboard[];
}

const Billboard = ({ billboards }: BillboardProps) => {
  // TODO: Use swiper
  const firstBillboard = billboards[0];
  return (
    <div className="p-4 sm:p-6 lg:p-8 overflow-hidden">
      <div
        style={{ backgroundImage: `url(${firstBillboard?.imageUrl})` }}
        className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover"
      >
        <div className="absolute left-10 top-2/4 -translate-y-2/4 text-[#212121] flex flex-col gap-8">
          <div className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs">
            {firstBillboard.label}
          </div>
          <Button className="w-fit uppercase">Shop now</Button>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
