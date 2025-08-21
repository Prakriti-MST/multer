
import multer, { FileFilterCallback } from "multer";
import path from "path";
import fs from "fs";

const UPLOAD_DIR = path.join(__dirname, "..", "..", "uploads");


if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, unique);
  }
});

const fileFilter = (_req: any, file: Express.Multer.File, cb: FileFilterCallback) => {
  // allow images and pdfs as example; adjust as required
  const allowed = /jpeg|jpg|png|gif|pdf/;
  const ext = path.extname(file.originalname).toLowerCase();
  const mimeOk = file.mimetype.startsWith("image/") || file.mimetype === "application/pdf";
  if (allowed.test(ext) && mimeOk) cb(null, true);
  else cb(new Error("Only images and PDFs are allowed"));
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5 MB
});
