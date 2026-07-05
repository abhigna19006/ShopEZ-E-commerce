const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getUsers
} = require("../controllers/userController");

// REGISTER
router.post("/register", register);

// LOGIN
router.post("/login", login);

// GET USERS (ADMIN OR TEST)
router.get("/", getUsers);

module.exports = router;