import express from "express";
import recommendationsRouter from "./src/routes/recommendations.js";

const app = express();

app.use(express.json());
app.use("/api", recommendationsRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Not Found", message: "Endpoint Not Found." });
});

// Final Error handler  handle any unhandled errors
app.use((err, req, res, next) => {
  console.error("[Unhandled Error]", err);
  res.status(500).json({ error: "Internal Server Error", message: "Unexpected error occurred." });
});

export default app;