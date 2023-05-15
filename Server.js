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
const cors =require("cors");
dotenv.config();



mongoose.connect("mongodb+srv://medpharmstore2023:medpharm123@cluster0.2orp8hr.mongodb.net")
  .then(() => {
    console.log('MongoDB connected Successfully!');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
  

const port = 8080 || process.env.PORT;


app.use(express.json());
app.use(cors());
app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/products", productRoute);
// app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/products",categoryRoute);

app.listen(port,()=>{
    console.log(`Server listening on port ${port}`)
})