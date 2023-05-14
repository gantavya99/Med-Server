const router = require("express").Router();

const Product = require('../models/Product');

router.get('/category',async (req,res)=>{
    const category = req.query.category;
    const products = await Product.find({category: category}).exec();
    res.json(products);
});

module.exports = router;