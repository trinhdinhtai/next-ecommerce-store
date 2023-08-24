import HeroImage from "@/components/HeroImage";
import Container from "@/components/layout/container";

export const revalidate = 0;

const HomePage = async () => {
  return (
    <Container>
      <div className="space-y-10 pb-10">
        <HeroImage />
      </div>
    </Container>
  );
};

export default HomePage;
