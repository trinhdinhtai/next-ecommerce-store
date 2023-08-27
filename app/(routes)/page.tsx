import { getBillboards } from "@/actions/billboards";
import Billboard from "@/components/Billboard";
import Container from "@/components/ui/container";

export const revalidate = 0;

const HomePage = async () => {
  const billboards = await getBillboards();

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard billboards={billboards} />
      </div>
    </Container>
  );
};

export default HomePage;
