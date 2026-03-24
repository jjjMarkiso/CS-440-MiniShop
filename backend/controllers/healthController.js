const healthService = require("../services/healthService");

const dbTest = async (req, res) => {
  try {
    const result = await healthService.getDbNow();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB connection failed" });
  }
};

module.exports = {
  dbTest,
};
