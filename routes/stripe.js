// const express = require("express");
// const Stripe = require("stripe");

// require("dotenv").config();

// const stripe = Stripe(process.env.STRIPE_KEY);
// const router = express.Router();
//   router.post("/create-checkout-session", async (req, res) => {
//     const session = await stripe.checkout.sessions.create({
      
//       line_items: [
//         {
//           price_data: {
//             currency: "usd",
//             product_data: {
//               name: "Product Name",
//             },
//             unit_amount: 2000, // Amount in cents
//           },
//           quantity: 1,
//         },
//       ],
//       mode: "payment",
//       success_url: `${process.env.CLIENT_URL}/cart`,
//       cancel_url: `${process.env.CLIENT_URL}/cart`,
//     });
  
//     res.json({ id: session.id });
//   });

//   module.exports=router;