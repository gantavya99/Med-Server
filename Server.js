const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const cors =require("cors");
dotenv.config();

mongoose.set('maxTimeMS', 40000);

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('MongoDB connected successfully');
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

app.listen(port,()=>{
    console.log(`Server listening on port ${port}`)
})