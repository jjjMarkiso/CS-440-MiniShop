const cartService = require("../services/cartService");

const getCart = async (req, res) => {
  try {
    const cartRows = await cartService.getCart();
    res.json(cartRows);
  } catch (err) {
    console.error("GET CART ERROR:", err);
    res.status(500).json({ error: "Failed to fetch cart", detail: err.message });
  }
};

const addAppleToCart = async (req, res) => {
  try {
    const cartRow = await cartService.addAppleToCart();
    res.status(200).json(cartRow);
  } catch (err) {
    if (err && err.message === "Apple not found in items table") {
      return res.status(404).json({ error: "Apple not found in items table" });
    }

    console.error("ADD TO CART ERROR:", err);
    res.status(500).json({ error: "Failed to add to cart", detail: err.message });
  }
};

module.exports = {
  getCart,
  addAppleToCart,
};
