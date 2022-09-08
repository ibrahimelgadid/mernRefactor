const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(process.env.Stripe_Secret_Key);

//---------------------------------------------|
//                STRIPE PAYMENTS
//---------------------------------------------|
exports.paymentIntent = asyncHandler(async (req, res) => {
  const { amount } = req.body;
  const payment = await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: "usd",
  });
  res.status(201).json({
    clientSecret: payment.client_secret,
  });
});
