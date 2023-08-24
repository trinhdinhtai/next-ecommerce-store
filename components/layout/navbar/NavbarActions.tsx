import { Button } from "@/components/ui/button";
import { Search, ShoppingBag, User } from "lucide-react";

const NavbarActions = () => {
  return (
    <div className="ml-auto flex items-center">
      <Button variant="ghost" className="px-3">
        <Search size={20} />
      </Button>
      <Button variant="ghost" className="px-3">
        <ShoppingBag size={20} />
      </Button>
      <Button variant="ghost" className="px-3">
        <User size={20} />
      </Button>
    </div>
  );
};

export default NavbarActions;
