const Order = require("../models/Order");

// PLACE ORDER
exports.createOrder = async (req, res) => {
  try {
    const { userId, products, total } = req.body;

    const newOrder = new Order({
      userId,
      products,
      total,
      status: "Pending",
    });

    await newOrder.save();

    res.json({
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// GET ALL ORDERS
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// GET USER ORDERS
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.params.userId;

    const orders = await Order.find({ userId }).sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
// UPDATE ORDER STATUS
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({
      message: "Order status updated successfully",
      order,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};