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
const stripe = require('./routes/stripe')



mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('MongoDB connected successfully!');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });


//stripe post API
  

  

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
app.use("api/stripe",stripe);

const port = process.env.PORT||8080;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server listening on port ${port}`);
});


//mongo dump and restore - naive (CLI)
//use mongo compass to export to CSV