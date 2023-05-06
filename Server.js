const express = require("express");
const mongoose = require("mongoose");
const app = express();



app.get('/', (req, res) => {
    res.send('Hello World!');
  });

 console.log()
mongoose.connect('mongodb+srv://medpharmstore2023:medpharm123@cluster0.2orp8hr.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
})
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