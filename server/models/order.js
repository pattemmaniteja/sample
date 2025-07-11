const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user:    { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  cart:    [{ id: String, name: String, price: Number, qty: Number }],
  amount:  Number,              // total in paise
  paid:    { type: Boolean, default: false },
  ref:     String,              // Stripe session id
  created: { type: Date, default: Date.now }
});

module.exports = { Order: mongoose.model("Order", orderSchema) };
