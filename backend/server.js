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

// REST INTEGRATION FOR CART SERVICE

// get all available items
app.get("/items", async (req, res) => {
  try {
    const result = await pool.query("SELECT name, value FROM items ORDER BY name");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch items", detail: err.message });
  }
});

app.get("/cart", async (req, res) => {
  try {
    const result = await pool.query("SELECT name, quantity, totalvalue FROM cart ORDER BY name");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cart", detail: err.message });
  }
});

app.post("/cart", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Item name is required" });
    }

    const itemResult = await pool.query(
      "SELECT name, value FROM items WHERE LOWER(name) = LOWER($1) LIMIT 1",
      [name]
    );

    if (itemResult.rows.length === 0) {
      return res.status(404).json({ error: "Item not found in items table" });
    }

    const item = itemResult.rows[0];

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
      [item.name, item.value]
    );

    res.status(201).json(cartResult.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to add to cart", detail: err.message });
  }
});

// Update cart item quantity
app.put("/cart/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const { quantity } = req.body;

    if (quantity === undefined || quantity < 0) {
      return res.status(400).json({ error: "Valid quantity is required" });
    }

    const itemResult = await pool.query(
      "SELECT value FROM items WHERE LOWER(name) = LOWER($1) LIMIT 1",
      [name]
    );

    if (itemResult.rows.length === 0) {
      return res.status(404).json({ error: "Item not found in items table" });
    }

    const value = Number(itemResult.rows[0].value);
    const totalvalue = quantity * value;

    if (quantity === 0) {
      await pool.query("DELETE FROM cart WHERE LOWER(name) = LOWER($1)", [name]);
      return res.json({ message: "Item removed from cart" });
    }

    const result = await pool.query(
      `
      UPDATE cart
      SET quantity = $1, totalvalue = $2
      WHERE LOWER(name) = LOWER($3)
      RETURNING *;
      `,
      [quantity, totalvalue, name]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Item not found in cart" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to update cart", detail: err.message });
  }
});

app.delete("/cart/:name", async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM cart WHERE LOWER(name) = LOWER($1) RETURNING *",
      [req.params.name]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Item not found in cart" });
    }

    res.json({ message: "Item removed", item: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete item", detail: err.message });
  }
});

// app.post("/cart/add-apple", async (req, res) => {
//   try {
//     // Get Apple’s value from items
//     const itemResult = await pool.query(
//       "SELECT name, value FROM items WHERE name = $1 LIMIT 1",
//       ["Apple"]
//     );

//     if (itemResult.rows.length === 0) {
//       return res.status(404).json({ error: "Apple not found in items table" });
//     }

//     const { name, value } = itemResult.rows[0]; // value should be 1

//     // Insert into cart, or if it already exists, increment quantity + totalvalue
//     const cartResult = await pool.query(
//       `
//       INSERT INTO cart (name, quantity, totalvalue)
//       VALUES ($1, 1, $2)
//       ON CONFLICT (name)
//       DO UPDATE SET
//         quantity = cart.quantity + 1,
//         totalvalue = cart.totalvalue + EXCLUDED.totalvalue
//       RETURNING *;
//       `,
//       [name, value]
//     );

//     res.status(200).json(cartResult.rows[0]);
//   } catch (err) {
//     console.error("ADD TO CART ERROR:", err);
//     res.status(500).json({ error: "Failed to add to cart", detail: err.message });
//   }
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});