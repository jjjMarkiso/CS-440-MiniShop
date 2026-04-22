const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "product-service" });
});

app.get("/products", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, price, description, created_at FROM products ORDER BY id ASC"
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("GET /products error:", err.message);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

app.post("/products", async (req, res) => {
  const { name, price, description } = req.body;

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return res.status(400).json({ error: "name is required" });
  }

  const numericPrice = Number(price);
  if (!Number.isFinite(numericPrice) || numericPrice < 0) {
    return res.status(400).json({ error: "price must be a non-negative number" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO products (name, price, description)
       VALUES ($1, $2, $3)
       RETURNING id, name, price, description, created_at`,
      [name.trim(), numericPrice, description ?? null]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({ error: "product name already exists" });
    }

    console.error("POST /products error:", err.message);
    res.status(500).json({ error: "Failed to create product" });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Product service running on port ${PORT}`);
});
