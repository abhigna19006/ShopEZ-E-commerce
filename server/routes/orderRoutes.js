const express = require("express");
const router = express.Router();
console.log("PUT ROUTE REGISTERED");

const {
  createOrder,
  getOrders,
  getUserOrders,
  updateOrderStatus
} = require("../controllers/orderController");


// Place order
router.post("/", createOrder);


// Get all orders (Admin)
router.get("/", getOrders);


// Get user orders
router.get("/user/:userId", getUserOrders);


// Update order status (Admin)
router.put("/:id", updateOrderStatus);


module.exports = router;