const express = require("express");
const router = express.Router();

const {
  createOrder,
  getOrders,
  getOrder
} = require("../controllers/orderController");

router.get("/", getOrders);
router.post("/", createOrder);
router.get("/:id", getOrder);

module.exports = router;