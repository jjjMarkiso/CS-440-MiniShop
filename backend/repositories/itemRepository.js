const pool = require("../db");

const getItemByName = async (name) => {
  const result = await pool.query(
    "SELECT name, value FROM items WHERE name = $1 LIMIT 1",
    [name]
  );

  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0];
};

module.exports = {
  getItemByName,
};
