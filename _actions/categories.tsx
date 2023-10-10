import { Category } from "@/types"

import { env } from "@/env.mjs"
import { prisma } from "@/lib/prismadb"

const STORE_ID = env.STORE_ID

const getCategoriesAction = async (): Promise<Category[]> => {
  const categories = await prisma.category.findMany({
    select: { _count: true, id: true, name: true, imageUrl: true },
    where: {
      storeId: STORE_ID,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return categories
}

export { getCategoriesAction }
