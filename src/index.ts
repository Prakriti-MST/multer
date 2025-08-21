// src/index.ts
import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import uploadRouter from "./routes/upload.route";

dotenv.config();

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

app.use(express.json());
app.use(cors());

// serve uploads folder statically
const UPLOAD_DIR = path.join(__dirname, "..", "uploads");
app.use("/uploads", express.static(UPLOAD_DIR));

// log
app.use((req, _res, next) => {
  console.log(`${new Date().toISOString()} ➜ ${req.method} ${req.originalUrl}`);
  next();
});

// mount upload routes under /api/upload
app.use("/api/upload", uploadRouter);

// health
app.get("/", (_req: Request, res: Response) => res.send("Hello"));

// basic error handler (catches multer errors)
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error("ERROR:", err);
  if (err.code === "LIMIT_FILE_SIZE")
    return res.status(400).json({ ok: false, message: "File too large" });
  res
    .status(400)
    .json({ ok: false, message: err.message || "Something went wrong" });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
