const Order = require("../models/order");

exports.createOrder = async (req, res) => {
  try {

    const { user, products, totalAmount } = req.body;

    const order = await Order.create({
      user,
      products,
      totalAmount
    });

    res.status(201).json({
      message: "Order created successfully",
      order
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


exports.getUserOrders = async (req, res) => {
  try {

    const orders = await Order.find({
      user: req.params.userId
    }).populate("products.product");

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};