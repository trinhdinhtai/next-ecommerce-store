import { env } from "process"
import { NextResponse } from "next/server"
import { currentUser } from "@clerk/nextjs"
import Stripe from "stripe"

import { prisma } from "@/lib/prismadb"
import { stripe } from "@/lib/stripe"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

export async function POST(
  _: Request,
  { params }: { params: { cartId: string } }
) {
  try {
    const user = await currentUser()

    if (!user?.emailAddresses?.[0]?.emailAddress) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const cartId = params.cartId

    if (!cartId) {
      return new NextResponse("Cart ID is required", { status: 400 })
    }

    const cart = await prisma.cart.findUnique({
      where: {
        id: cartId,
      },
      select: {
        cartItems: {
          select: {
            id: true,
            productId: true,
            product: {
              select: {
                name: true,
                images: true,
                price: true,
                category: {
                  select: {
                    name: true,
                  },
                },
              },
            },
            quantity: true,
          },
        },
      },
    })

    if (!cart) {
      return new NextResponse("Cart not found", { status: 404 })
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = []

    const cartItems = cart.cartItems

    cartItems.forEach((cartItem) => {
      line_items.push({
        quantity: cartItem.quantity,
        price_data: {
          currency: "USD",
          product_data: {
            name: cartItem.product.name,
          },
          unit_amount: Number(cartItem.product.price) * 100,
        },
      })
    })

    const order = await prisma.order.create({
      data: {
        storeId: env.STORE_ID!,
        isPaid: false,
        orderItems: {
          create: cartItems.map((cartItem) => ({
            product: {
              connect: {
                id: cartItem.productId,
              },
            },
            quantity: cartItem.quantity,
          })),
        },
      },
    })

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      billing_address_collection: "required",
      phone_number_collection: {
        enabled: true,
      },
      success_url: `${env.NEXT_PUBLIC_APP_URL}/cart?success=1`,
      cancel_url: `${env.NEXT_PUBLIC_APP_URL}/cart?canceled=1`,
      metadata: {
        orderId: order.id,
      },
    })

    return NextResponse.json(
      { url: session.url },
      {
        headers: corsHeaders,
      }
    )
  } catch (error) {
    console.log("[CART_ID_CHECKOUT]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
