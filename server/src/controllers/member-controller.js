const AppUser = require("../models/app-user");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const findCustomer = async (req, res) => {
  const userId = req.userId;
  const user = await AppUser.findById(userId).exec();
  if (!user) return res.status(404).send("User not found");

  const customers = await stripe.customers.search({
    query: `email:${user.email}`,
  });
  if (customers.data.length <= 0) return res.status(404).send("Customer not found");
  res.send(customers.data[0]);
};

module.exports = {findCustomer}