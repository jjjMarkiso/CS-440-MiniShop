const pool = require("../db");

const getCartRows = async () => {
  const result = await pool.query("SELECT name, quantity, totalvalue FROM cart");
  return result.rows;
};

const upsertCartItem = async (name, value) => {
  const result = await pool.query(
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

  return result.rows[0];
};

module.exports = {
  getCartRows,
  upsertCartItem,
};
