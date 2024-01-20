const Product = require("../models/product");

// Crete new product => api/v1/product/new
exports.newProduct = async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
};

exports.getProducts = async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    count: products.length,
    products,
  });
};

//  Get single product details => /api/v1/product/:id

exports.getSingleProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (product == null) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }
  res.status(200).json({
    success: true,
    product,
  });
};

// Update product => /api/v1/product/:id

exports.updateProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (product == null) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: True,
    runValidators: true,
    useFindAndModify: false,
  });
  res.send(200).json({
    success: true,
    product,
  });
};
