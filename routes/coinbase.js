const router = require("express").Router();
var coinbase = require('coinbase-commerce-node');
var Client = coinbase.Client;
require('dotenv').config();
var resources = coinbase.resources;

Client.init(process.env.COINBASE_KEY);

router.post("/checkout",async (req,res) => {
  const {amount} = req.body;

  try{
    const charge = await resources.Charge.create({
      name:"Product",
      description:"Product Description",
      local_price:{
        amount:amount,
        currency:"USD"
      },
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

module.exports = router;