import { Billboard } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`;

const getBillboards = async (): Promise<Billboard[]> => {
  const res = await fetch(URL);

  return res.json();
};

const getBillboardById = async (id: string): Promise<Billboard> => {
  const res = await fetch(`${URL}/${id}`);

  return res.json();
};

export { getBillboards, getBillboardById };
