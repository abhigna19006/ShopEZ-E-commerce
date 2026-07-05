const express = require("express");
const router = express.Router();

// IMPORTANT: must be destructured correctly
const {
  createOrder,
  getOrders,
  getUserOrders
} = require("../controllers/orderController");

// ✅ CORRECT (NO parentheses ())
router.post("/create", createOrder);

// GET ALL ORDERS
router.get("/", getOrders);

// USER ORDERS
router.get("/user/:userId", getUserOrders);

module.exports = router;