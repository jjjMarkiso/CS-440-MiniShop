const express = require("express");
const router = express.Router();
const { getCart, addApple } = require("../controllers/cartController");

router.get("/", getCart);
router.post("/add-apple", addApple);

module.exports = router;