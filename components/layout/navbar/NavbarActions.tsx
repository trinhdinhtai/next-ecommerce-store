"use client";

import { Button } from "@/components/ui/button";
import useCart from "@/hooks/useCart";
import { Search, ShoppingCart, User } from "lucide-react";
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
    <div className="ml-auto flex items-center">
      <Button variant="ghost" className="px-3">
        <Search size={20} />
      </Button>
      <Button
        variant="ghost"
        className="px-3 relative"
        onClick={() => router.push("/cart")}
      >
        <ShoppingCart size={20} />
        <span className="absolute w-4 h-4 rounded-full top-0 right-0 flex items-center justify-center bg-destructive text-xs text-secondary font-medium">
          {cart.items.length}
        </span>
      </Button>
      <Button variant="ghost" className="px-3">
        <User size={20} />
      </Button>
    </div>
  );
};

export default NavbarActions;
