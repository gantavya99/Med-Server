const router = require("express").Router();
var coinbase = require('coinbase-commerce-node');
const {webhook} = require('coinbase-commerce-node')
var Client = coinbase.Client;
require('dotenv').config();
var resources = coinbase.resources;
const webhookSecret = process.env.COINBASE_WEBHOOK
Client.init(process.env.COINBASE_KEY);

router.post("/checkout",async (req,res) => {
  const {amount, productName, email} = req.body;
  
  try{
    const charge = await resources.Charge.create({
      name:"MedPharma",
      description:productName,
      local_price:{
        amount:amount,
        currency:"USD"
      },
      
      pricing_type:"fixed_price",
      metadata:{
        user_email:email
      }
    });
    res.status(200).json({
      charge:charge,
    });
  }
catch(error){
  res.status(500).json({
    error:error,
  });
}
})



module.exports = router;