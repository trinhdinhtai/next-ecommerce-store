import { notFound } from "next/navigation"

import CheckoutForm from "@/components/forms/checkout-form"
import { getCartAction } from "@/app/_actions/cart"

export default async function CartCheckoutPage() {
  const cart = await getCartAction()

  if (!cart) return notFound()

  const { id, cartItems, itemCount, totalAmount } = cart

  return (
    <section className="container grid min-h-screen grid-cols-1 py-12 lg:grid-cols-2 lg:gap-8">
      <CheckoutForm />
    </section>
  )
}
