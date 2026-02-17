const express = require("express");
const pool = require("./db");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW() as now");
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB connection failed" });
  }
});

app.post("/cart/add-apple", async (req, res) => {
  try {
    // Get Apple’s value from items
    const itemResult = await pool.query(
      "SELECT name, value FROM items WHERE name = $1 LIMIT 1",
      ["Apple"]
    );

    if (itemResult.rows.length === 0) {
      return res.status(404).json({ error: "Apple not found in items table" });
    }

    const { name, value } = itemResult.rows[0]; // value should be 1

    // Insert into cart, or if it already exists, increment quantity + totalvalue
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

    res.status(200).json(cartResult.rows[0]);
  } catch (err) {
    console.error("ADD TO CART ERROR:", err);
    res.status(500).json({ error: "Failed to add to cart", detail: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});