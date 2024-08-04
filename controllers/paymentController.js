require("dotenv").config();
const Stripe = require("stripe")
const stripe = Stripe(process.env.STRIPE_SECRET);

const stripePaymentController = async (req, res) => {
  try {
    const { products } = req.body;
    const lineItems = products.map((product) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: product.title,
          images: [product.image],
        },
        unit_amount: Math.round(product.price * 100)
      },
      quantity: product.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "https://vipul-redmart.vercel.app/success",
      cancel_url: "https://vipul-redmart.vercel.app/cancel",
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating Stripe checkout session:", error);
    if (error.type === "StripeInvalidRequestError") {
      res.status(400).json({
        error: "Invalid request to Stripe API",
        details: error.message,
      });
    } else {
      res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    }
  }
};

module.exports = { stripePaymentController };
