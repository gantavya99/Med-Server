const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth")

dotenv.config();



mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });


const port = 5000 || process.env.PORT;


app.use(express.json());

app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);

app.listen(port,()=>{
    console.log(`Server listening on port ${port}`)
})