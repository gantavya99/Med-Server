const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const categoryRoute = require("./routes/category");
const coinbaseRoute = require("./routes/coinbase");
const cors = require("cors");
const bodyParser = require('body-parser');
dotenv.config();


mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('MongoDB connected successfully!');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });


const stripe = require('stripe')(process.env.STRIPE_KEY);


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/create-checkout-session', async (req, res) => {
  const { price } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Product Name',
              description: 'Product Description',
            },
            unit_amount: price * 100, // Stripe expects price in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://med-client.vercel.app/success',
      cancel_url: 'https://med-client.vercel.app/cart',
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});





  

console.log(process.env.PORT);

app.get("/", (req, res) => {
  res.send("Helldo World!!");
});


app.use(bodyParser.json());

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
 app.use("/api/coinbase", coinbaseRoute);
app.use("/api/orders", orderRoute);
app.use("/api/products/category", categoryRoute);


const port = process.env.PORT||8080;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server listening on port ${port}`);
});


//mongo dump and restore - naive (CLI)
//use mongo compass to export to CSV