import Container from "../ui/container";

const Footer = () => {
  return (
    <footer className="border-t">
      <Container>
        <div className="p-4 sm:p-6 lg:p-8 overflow-hidden">
          <div className="flex flex-col gap-4">
            <p className="text-center text-sm">
              &copy; 2023 Anon, Inc. All rights reserved.
            </p>
            <div className="flex gap-2 md:gap-5 text-center md:text-left flex-wrap justify-center text-xs">
              <div className="cursor-pointer">Guides</div>
              <div className="cursor-pointer">Terms of Sale</div>
              <div className="cursor-pointer">Terms of Use</div>
              <div className="cursor-pointer">Privacy Policy</div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
