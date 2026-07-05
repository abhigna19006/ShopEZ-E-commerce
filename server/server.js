require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ DEBUG LINE (ADD HERE)
console.log("SERVER VERSION LOADED - CHECKING ROUTES");

app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));

// MONGO DB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB connected successfully");
})
.catch((err) => {
  console.log("MongoDB error:", err.message);
});

// SERVER START
app.listen(5000, () => {
  console.log("Server running on port 5000");
});