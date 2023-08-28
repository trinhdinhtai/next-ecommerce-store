"use client";

import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useCart from "@/hooks/useCart";
import { Heart, Search, ShoppingCart, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const NavbarActions = () => {
  const router = useRouter();
  const cart = useCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="ml-auto flex items-center gap-2 text-gray-700 dark:text-gray-300">
      <div className="relative w-[400px]">
        <Input placeholder="Search for products ..." className="rounded-2xl" />

        <Button
          variant="ghost"
          className="absolute top-0 right-0 rounded-tr-2xl rounded-br-2xl rounded-bl-none rounded-tl-none"
        >
          <Search size={24} />
        </Button>
      </div>

      <ThemeToggle />

      <Button
        variant="ghost"
        className="px-3 relative"
        onClick={() => router.push("/cart")}
      >
        <ShoppingCart size={24} />
        <span className="absolute w-4 h-4 rounded-full top-0 right-0 flex items-center justify-center bg-destructive text-destructive-foreground text-xs font-medium">
          {cart.items.length}
        </span>
      </Button>
      <Button
        variant="ghost"
        className="px-3 relative"
        onClick={() => router.push("/wishlist")}
      >
        <Heart size={24} />
        <span className="absolute w-4 h-4 rounded-full top-0 right-0 flex items-center justify-center bg-destructive text-destructive-foreground text-xs font-medium">
          {0}
        </span>
      </Button>
      <Button variant="ghost" className="px-3">
        <User size={24} />
      </Button>
    </div>
  );
};

export default NavbarActions;
