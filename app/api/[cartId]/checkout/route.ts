import { NextResponse } from "next/server"
import { currentUser } from "@clerk/nextjs"

export async function POST(
  req: Request,
  { params }: { params: { cartId: string } }
) {
  try {
    const user = await currentUser()
    return NextResponse.json(params.cartId)
  } catch (error) {
    console.log("[CART_ID_CHECKOUT]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
