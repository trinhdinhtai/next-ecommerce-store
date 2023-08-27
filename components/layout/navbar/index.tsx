import Link from "next/link";
import Container from "../../ui/container";
import NavbarActions from "./NavbarActions";

const Navbar = () => {
  return (
    <div className="border-b sticky top-0 left-0 z-20 bg-white">
      <Container>
        <div className="flex items-center relative p-4 sm:px-6 lg:px-8 h-16">
          <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
            <p className="font-bold text-xl">TaitdStore</p>
          </Link>
          <NavbarActions />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
