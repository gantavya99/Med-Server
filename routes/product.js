const router = require("express").Router();


const Product = require('../models/Product');



router.get("/", async (req, res) => {
  const qCategory = req.query.category;
  try {
    const products = await Product.find({ category: qCategory });

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});


// Get a specific product by ID
router.get('/:id', getProduct, (req, res) => {
  res.json(res.product);
});

// Create a new product
router.post('/', async (req, res) => {
  const product = new Product({
    title: req.body.title,
    description: req.body.desc,
    imag: req.body.img,
    category: req.body.category,
    discount: req.body.discount,
    price: req.body.price,
    available: req.body.quantity
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



// Middleware function to get product by ID
async function getProduct(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: 'Cannot find product' });
    }
    res.product = product;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;


