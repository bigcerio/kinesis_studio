import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";

const tierPriceEnv: Record<string, string | undefined> = {
  monthly: process.env.STRIPE_PRICE_MONTHLY,
  semiannual: process.env.STRIPE_PRICE_SEMIANNUAL,
  annual: process.env.STRIPE_PRICE_ANNUAL,
};

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id || !session.user.email) {
    return NextResponse.json({ error: "Devi accedere prima di abbonarti." }, { status: 401 });
  }

  const { tier } = await request.json().catch(() => ({ tier: undefined }));
  const priceId = tier ? tierPriceEnv[tier] : undefined;
  if (!priceId) {
    return NextResponse.json({ error: "Piano di abbonamento non valido o non configurato." }, { status: 400 });
  }

  const origin = request.headers.get("origin") ?? process.env.NEXTAUTH_URL ?? "http://localhost:3000";
  const stripe = getStripe();

  let subscription = await prisma.subscription.findUnique({ where: { userId: session.user.id } });

  let stripeCustomerId = subscription?.stripeCustomerId;
  if (!stripeCustomerId) {
    const customer = await stripe.customers.create({
      email: session.user.email,
      metadata: { userId: session.user.id },
    });
    stripeCustomerId = customer.id;
    subscription = await prisma.subscription.upsert({
      where: { userId: session.user.id },
      create: { userId: session.user.id, stripeCustomerId },
      update: { stripeCustomerId },
    });
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: stripeCustomerId,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${origin}/corpo?abbonamento=attivato`,
    cancel_url: `${origin}/abbonamento`,
  });

  return NextResponse.json({ url: checkoutSession.url });
}
