const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();

dotenv.config();

app.get('/hello', (req, res) => {
    res.send('Hello World!');
  });

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });


const port = 5000 || process.env.PORT;

app.listen(port,()=>{
    console.log(`Server listening on port ${port}`)
})