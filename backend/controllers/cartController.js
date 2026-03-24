const { getCartItems, addAppleToCart } = require("../models/cartModel");

async function getCart(req, res) {
  try {
    const cartItems = await getCartItems();
    res.json(cartItems);
  } catch (err) {
    console.error("GET CART ERROR:", err);
    res.status(500).json({
      error: "Failed to fetch cart",
      detail: err.message,
    });
  }
}

async function addApple(req, res) {
  try {
    const cartItem = await addAppleToCart();

    if (!cartItem) {
      return res.status(404).json({
        error: "Apple not found in items table",
      });
    }

    res.status(200).json(cartItem);
  } catch (err) {
    console.error("ADD TO CART ERROR:", err);
    res.status(500).json({
      error: "Failed to add to cart",
      detail: err.message,
    });
  }
}

module.exports = {
  getCart,
  addApple,
};