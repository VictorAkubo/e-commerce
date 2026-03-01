import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const PaymentCheckout =  async (req, res) => {
  try {
    const { cartItem } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: cartItem.map(item => ({
        price_data: {
          currency: "ngn",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100, // Stripe uses kobo
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    res.json({ url: session.url });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};


