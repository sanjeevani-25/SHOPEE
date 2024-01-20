const express = require("express");
const router = express.Router();

const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
} = require("../controllers/productControllers");

router.route("/products").get(getProducts);
router.route("/product/:id").get(getSingleProduct);

router.route("/product/new").post(newProduct);

router.route("/product/:id").put(updateProduct);

module.exports = router;
