const pool = require("./db");

async function initDb() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(120) NOT NULL UNIQUE,
        price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
        description TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    console.log("products table is ready");
  } catch (err) {
    console.error("Error creating products table:", err.message);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

initDb();
