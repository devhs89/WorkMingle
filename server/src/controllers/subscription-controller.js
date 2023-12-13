const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [{
        price: 'price_1OKC9tLXHm377QtRvVwUIupO', quantity: 1,
      },],
      mode: 'subscription',
      success_url: 'http://localhost:4200/#/subscription/confirm',
      cancel_url: 'http://localhost:4200/#/subscription/order',
      automatic_tax: {enabled: true},
    });
    res.json({successUrl: session.url});
  } catch (e) {
    res.status(400).json({error: e.message});
  }
};

module.exports = {createCheckoutSession};