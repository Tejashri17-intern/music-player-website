import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import authRoutes from "./routes/authRoutes.js";
import songRouter from "./routes/songRoutes.js"; 

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/song", songRouter);

app.get("/api", (req, res) => {
  res.status(200).json({ message: "Server is working" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



