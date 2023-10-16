import { Billboard } from "@/types"

import { env } from "@/env.mjs"
import { prisma } from "@/lib/prismadb"

const STORE_ID = env.STORE_ID

const getBillboardsAction = async (): Promise<Billboard[]> => {
  const billboards = await prisma.billboard.findMany({
    where: {
      storeId: STORE_ID,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return billboards
}

const getBillboardById = async (id: string): Promise<Billboard> => {
  const res = await fetch(`${URL}/${id}`)

  return res.json()
}

export { getBillboardsAction, getBillboardById }
