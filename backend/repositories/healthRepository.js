const pool = require("../db");

const getNow = async () => {
  const result = await pool.query("SELECT NOW() as now");
  return result.rows[0];
};

module.exports = {
  getNow,
};
