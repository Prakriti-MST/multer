import path from "path";
import fs from "fs";
import { Request, Response } from "express";

const UPLOAD_DIR = path.join(process.cwd(), "uploads");

export const getFileById = (req: Request, res: Response) => {
  const { id } = req.params;
  const filePath = path.join(UPLOAD_DIR, id);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ ok: false, message: "File not found" });
  }

  return res.sendFile(filePath);
};
