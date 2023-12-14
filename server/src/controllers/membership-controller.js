const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const env = process.env.NODE_ENV;

const createCheckoutSession = async (req, res) => {
  try {
    // Set base URL depending on environment
    const baseUrl = env === 'production' ? 'https://workmingle.usualapps.com' : 'http://localhost:3000';

    // Create a new checkout session
    const session = await stripe.checkout.sessions.create({
      line_items: [{
        price: 'price_1OKC9tLXHm377QtRvVwUIupO', quantity: 1,
      },],
      mode: 'subscription',
      success_url: `${baseUrl}/#/subscription/confirm`,
      cancel_url: `${baseUrl}/#/subscription/order`,
      automatic_tax: {enabled: true},
    });
    res.json({successUrl: session.url});
  } catch (e) {
    res.status(400).json({error: e.message});
  }
};

module.exports = {createCheckoutSession};