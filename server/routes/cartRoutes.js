const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCart,
  updateCartQuantity,
  removeFromCart
} = require("../controllers/cartController");


// Add item to cart
router.post("/", addToCart);


// Update quantity (+ / -)
router.put("/update", updateCartQuantity);


// Remove item from cart
router.delete("/remove", removeFromCart);


// Get user cart
router.get("/:userId", getCart);


module.exports = router;