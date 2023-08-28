import Link from "next/link";
import Container from "../../ui/container";
import NavbarActions from "./NavbarActions";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="border-b sticky top-0 left-0 z-20 bg-white">
      <Container>
        <div className="flex items-center relative p-4 sm:px-6 lg:px-8 h-16">
          <Link href="/">
            <Image src="/logo.svg" width={100} height={100} alt="App logo" />
          </Link>

          <NavbarActions />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
