const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);

const cartRoutes = require("./routes/cartRoutes");
app.use("/api/cart", cartRoutes);
console.log("Cart routes loaded");

const orderRoutes = require("./routes/orderRoutes");
app.use("/api/orders", orderRoutes);


// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });


// Test API
app.get("/", (req, res) => {
  res.send("ShopEZ-Ecommerce Server Running");
});


// Server Start
const PORT = process.env.PORT || 5000;

console.log("Product routes loaded")
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});