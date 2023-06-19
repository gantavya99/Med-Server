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
const cors = require("cors");
dotenv.config();
const stripe = require('stripe')('sk_test_51MNhagSHk6cCnpyb9orF6UX5RYcaM3IHjndKQY6BLdYlSCh9a7GnV6ayrseFtULOGAPJ6reWU7zXSNhfm6nBmtLb00k19zjmZ9');



mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('MongoDB connected successfully!');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });


//stripe post API
  app.use(express.static('public'));
  app.post("/create-checkout-session", async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Product Name",
            },
            unit_amount: 2000, // Amount in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000?success=true",
      cancel_url: "http://localhost:3000?canceled=true",
    });
  
    res.json({ id: session.id });
  });



console.log(process.env.PORT);

app.get("/", (req, res) => {
  res.send("Helldo World!!");
});


app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
// app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/products/category", categoryRoute);


const port = process.env.PORT||8080;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server listening on port ${port}`);
});


//mongo dump and restore - naive (CLI)
//use mongo compass to export to CSV