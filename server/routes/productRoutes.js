const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts,
  updateProduct
} = require("../controllers/productController");


router.post("/", createProduct);

router.get("/", getProducts);

router.put("/:id", updateProduct);


module.exports = router;