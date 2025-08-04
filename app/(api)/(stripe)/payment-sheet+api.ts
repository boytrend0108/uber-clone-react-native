import { stripe } from "@/stripe-server";

export const POST = async (request: Request) => {
  try {
    // Using hardcoded amount for now - €100.00
    const amountInCents = 10000;

    // Use an existing Customer ID if this is a returning customer.
    const customer = await stripe.customers.create();
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: '2025-07-30.basil' }
    );


    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'eur',
      customer: customer.id,
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter
      // is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });


    return Response.json({
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
      publishableKey: process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY
    });
  } catch (error) {
    console.error("Payment sheet error:", error);

    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};