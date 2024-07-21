const express = require("express");
const { signup, login, user, borrow } = require("../Controller/authController");
const verifyToken = require("../Middlewares/verifyToken");
const router = express.Router();

// defined all the routes as well as middle ware functions
router.post("/signup", signup);
router.post("/login", login);
router.get("/user", verifyToken, user);
router.post("/borrow", verifyToken, borrow);
module.exports = router;
