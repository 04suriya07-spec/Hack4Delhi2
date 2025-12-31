import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes";
import wardRoutes from "./routes/ward.routes";
import reportRoutes from "./routes/report.routes";
import aiRoutes from "./routes/ai.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/wards", wardRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/ai", aiRoutes);

app.get("/health", (_, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
