const express = require("express");
const cors = require("cors");
const healthRoutes = require("./routes/healthRoutes");
const cartRoutes = require("./routes/cartRoutes");

const app = express();

app.use(express.json());
app.use(cors());

app.use(healthRoutes);
app.use(cartRoutes);

module.exports = app;
