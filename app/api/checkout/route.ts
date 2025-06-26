// app/api/checkout/route.ts
// Creates a Stripe Checkout session for orders and returns the session URL.
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // Uses the default API version for the installed Stripe SDK
});

export async function POST(req: NextRequest) {
  const { items, orderId } = await req.json();
  if (!items || !Array.isArray(items) || !orderId) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const line_items = items.map((item: any) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.name,
      },
      unit_amount: item.price,
    },
    quantity: item.quantity,
  }));
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?orderId=${orderId}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
    metadata: { orderId },
  });
  return NextResponse.json({ url: session.url });
}
