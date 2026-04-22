import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createProxyMiddleware } from "http-proxy-middleware";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || "http://localhost:5001";
const CART_SERVICE_URL = process.env.CART_SERVICE_URL || "http://localhost:5000";
const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL || "http://localhost:5002";

app.use(cors());
app.use(express.json());

// Simple health check
app.get("/", (req, res) => {
  res.json({
    message: "API Gateway is running"
  });
});

// Auth routes
app.use(
  "/auth",
  createProxyMiddleware({
    target: AUTH_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/auth": ""
    }
  })
);

// Cart routes
app.use(
  "/cart",
  createProxyMiddleware({
    target: CART_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/cart": "/cart"
    }
  })
);

// Product routes
app.use(
  "/products",
  createProxyMiddleware({
    target: PRODUCT_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/products": "/products"
    }
  })
);

// Optional error handler
app.use((err, req, res, next) => {
  console.error("Gateway error:", err.message);
  res.status(500).json({
    error: "API Gateway error"
  });
});

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
  console.log(`Auth Service -> ${AUTH_SERVICE_URL}`);
  console.log(`Cart Service -> ${CART_SERVICE_URL}`);
  console.log(`Product Service -> ${PRODUCT_SERVICE_URL}`);
});