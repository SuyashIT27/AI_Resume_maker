import express from "express";
import cors from "cors";

import { env } from "./config/env.js";
import atsRoutes from "./routes/ats.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import languageRoutes from "./routes/language.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";

const app = express();

app.use(cors({ origin: env.frontendUrl }));
app.use(express.json({ limit: "2mb" }));

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Resume Maker backend is running."
  });
});

app.use("/api/ats", atsRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/language", languageRoutes);

app.use(errorMiddleware);

app.listen(env.port, () => {
  console.log(
    `Resume Maker backend running on http://localhost:${env.port}`
  );
});
