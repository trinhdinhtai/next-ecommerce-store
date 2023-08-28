"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

interface CurrencyProps {
  value?: string | number;
  variant?: "default" | "contained";
}

const Currency: React.FC<CurrencyProps> = ({
  value = 0,
  variant = "default",
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div
      className={cn(
        "font-semibold w-fit",
        variant === "contained" &&
          "bg-primary text-secondary rounded-lg px-2 py-1"
      )}
    >
      {formatter.format(Number(value))}
    </div>
  );
};

export default Currency;
