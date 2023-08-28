"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUp } from "lucide-react";
import { MouseEvent, useEffect, useState } from "react";

const SCROLL_OFFSET: number = 1550;

const ScrollToTopButton = () => {
  const [show, setShow] = useState(false);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    let handleWindowScroll = () => {
      if (window.scrollY > SCROLL_OFFSET) setShow(true);
      else setShow(false);
    };

    window.addEventListener("scroll", handleWindowScroll);
    return () => window.removeEventListener("scroll", handleWindowScroll);
  }, []);
  return (
    <Button
      variant="default"
      size="icon"
      aria-label="Scroll To Top"
      type="button"
      onClick={handleClick}
      className={cn(show ? "flex" : "hidden", "fixed bottom-8 right-8 z-50")}
    >
      <ArrowUp />
    </Button>
  );
};

export default ScrollToTopButton;
