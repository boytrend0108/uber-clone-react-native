import { stripe } from '@/stripe-server';

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { name, email, amount } = body;

    const cleanName = typeof name === 'string' ? name.trim() : '';
    const cleanEmail = typeof email === 'string' ? email.trim() : '';
    const cleanAmount =
      typeof amount === 'string'
        ? amount.trim()
        : amount?.toString()?.trim() || '';

    if (
      !cleanName ||
      cleanName === 'null' ||
      cleanName === 'undefined' ||
      cleanName === 'null null' ||
      !cleanEmail ||
      cleanEmail === 'null' ||
      cleanEmail === 'undefined' ||
      !cleanAmount ||
      cleanAmount === '0' ||
      cleanAmount === 'null' ||
      cleanAmount === 'undefined'
    ) {
      return new Response(
        JSON.stringify({
          error: 'Missing or invalid required fields',
          received: {
            originalName: name,
            originalEmail: email,
            originalAmount: amount,
            cleanName,
            cleanEmail,
            cleanAmount,
          },
        }),
        {
          status: 400,
        }
      );
    }

    // Convert amount to cents (Stripe expects integer)
    const amountInCents = Math.round(parseFloat(cleanAmount) * 100);

    // Use an existing Customer ID if this is a returning customer.
    const customer = await stripe.customers.create({
      name: cleanName,
      email: cleanEmail,
    });

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
      publishableKey: process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    });
  } catch {
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
};
