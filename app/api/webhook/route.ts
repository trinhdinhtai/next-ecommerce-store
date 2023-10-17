import { headers } from "next/headers"
import { NextResponse } from "next/server"
import Stripe from "stripe"

import { env } from "@/env.mjs"
import { prisma } from "@/lib/prismadb"
import { stripe } from "@/lib/stripe"

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get("Stripe-Signature") as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET
    )
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
  }

  const session = event.data.object as Stripe.Checkout.Session
  const address = session?.customer_details?.address

  const addressComponents = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country,
  ]

  const addressString = addressComponents.filter((c) => c !== null).join(", ")

  if (event.type === "checkout.session.completed") {
    const customer = await prisma.customer.create({
      data: {
        name: session?.customer_details?.name ?? "",
        phone: session?.customer_details?.phone ?? "",
        email: session?.customer_details?.email ?? "",
        address: addressString,
      },
    })

    await prisma.order.update({
      where: {
        id: session?.metadata?.orderId,
      },
      data: {
        isPaid: true,
        customerId: customer.id,
      },
      include: {
        orderItems: true,
      },
    })
  }

  return new NextResponse(null, { status: 200 })
}
