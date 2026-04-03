import Stripe from 'stripe';
import authentication from "../schema/auth.js"
const stripe = new Stripe("sk_test_51T0KEtIkDgweCy7QQrvR0jMlLxKptnB4qJrH6XyBKUM27Xc4ly3FEq3s3vU4n1NWlmfDnvdvIndrTapMmssHVMNq00J4zdWCaw");

export const PaymentCheckout =  async (req, res) => {
  try {
    const { cartItems,email } = req.body;

    const session = await stripe.checkout.sessions.create({
      /*
      payment_method_types: ["card"],*/
      line_items: cartItems.map(item => ({
        price_data: {
          currency: "ngn",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100, // Stripe uses kobo
        },
        quantity: item.count,
      })),
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });
    
    const result = await authentication.findOneAndUpdate(
  { email: email }, // Find user by email
  { $push: { order: cartItems } },
  { new: true, runValidators: true }
);

    res.json({ url: session.url });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};


