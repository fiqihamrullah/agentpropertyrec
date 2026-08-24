import  app from "./app.js";
import { driver } from "./src/config/db.js";

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`Property Agent API running at http://localhost:${PORT}`);
});

async function shutdown(signal) {
  console.log(`\n[${signal}] Shutting down gracefully...`);
  server.close(async () => {
    await driver.close();
    process.exit(0);
  });
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));