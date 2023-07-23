const router = require("express").Router();
var coinbase = require('coinbase-commerce-node');
const {webhook} = require('coinbase-commerce-node')
var Client = coinbase.Client;
require('dotenv').config();
var resources = coinbase.resources;
const webhookSecret = process.env.COINBASE_WEBHOOK
Client.init(process.env.COINBASE_KEY);

router.post("/checkout",async (req,res) => {
  const {amount,productName} = req.body;
  
  try{
    const charge = await resources.Charge.create({
      name:"MedPharma",
      description:productName,
      local_price:{
        amount:amount,
        currency:"USD"
      },
      requested_info:['name','email','address'],
      pricing_type:"fixed_price",
      metadata:{
        user_email:"medpharmastore123@gmail.com"  
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

router.post("/webhooks",async(req,res)=>{
  const event = Webhook.verifyEventBody(
    req.rawBody,
    req.headers["x-cc-webhook-signature"],
    process.env.COINBASE_WEBHOOK
    );
    if(event.type === "charge:confirmed"){
      let amount = event.data.pricing.local.amount;
      let currency = event.data.pricing.local.currency;
      console.log(`Payment Successfull ${amount,currency}`);
    }
})

module.exports = router;