const express = require("express");
const Stripe = require("stripe");
const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const { Order } = require("../models/order");


router.post("/create-checkout-session", async (req, res) => {
  const { cart, userId } = req.body;
  const line_items = cart.map(item => ({
    price_data: {
      currency: "inr",
      product_data: { name: item.name },
      unit_amount: Math.round(item.price * 100)
    },
    quantity: item.qty
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items,
    success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CLIENT_URL}/payment-cancel`
  });
  await Order.create({
    ref: session.id,
    userId,
    cart,
    paid: false,
    amount: line_items.reduce((acc, item) => acc + item.price_data.unit_amount * item.quantity, 0) / 100
  });

  res.json({ url: session.url });
});

module.exports = router;
