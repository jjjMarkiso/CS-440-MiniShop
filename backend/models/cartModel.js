const pool = require("../db");

async function getCartItems() {
  const result = await pool.query(
    "SELECT name, quantity, totalvalue FROM cart"
  );
  return result.rows;
}

async function addAppleToCart() {
  const itemResult = await pool.query(
    "SELECT name, value FROM items WHERE name = $1 LIMIT 1",
    ["Apple"]
  );

  if (itemResult.rows.length === 0) {
    return null;
  }

  const { name, value } = itemResult.rows[0];

  const cartResult = await pool.query(
    `
    INSERT INTO cart (name, quantity, totalvalue)
    VALUES ($1, 1, $2)
    ON CONFLICT (name)
    DO UPDATE SET
      quantity = cart.quantity + 1,
      totalvalue = cart.totalvalue + EXCLUDED.totalvalue
    RETURNING *;
    `,
    [name, value]
  );

  return cartResult.rows[0];
}

module.exports = {
  getCartItems,
  addAppleToCart,
};