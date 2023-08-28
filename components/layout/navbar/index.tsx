import Link from "next/link";
import Container from "../../ui/container";
import NavbarActions from "./NavbarActions";
import LogoIcon from "@/components/icons/logo";
import { cn } from "@/lib/utils";

const Navbar = () => {
  return (
    <div className="border-b sticky top-0 left-0 z-20 bg-background">
      <Container>
        <div className="flex items-center relative p-4 sm:px-6 lg:px-8 h-16 dark:text-white">
          <Link href="/">
            <LogoIcon className="h-8" />
          </Link>

          <NavbarActions />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
