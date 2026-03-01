import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51T0KEtIkDgweCy7QQrvR0jMlLxKptnB4qJrH6XyBKUM27Xc4ly3FEq3s3vU4n1NWlmfDnvdvIndrTapMmssHVMNq00J4zdWCaw');


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


