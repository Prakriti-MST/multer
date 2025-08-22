// src/controllers/upload.controller.ts
import path from "path";
import fs from "fs";
import { Request, Response } from "express";


const UPLOAD_DIR = path.resolve(__dirname, "..","..", "uploads");


export const getFileById = (req: Request, res: Response) => {
    console.log("UPLOAD_DIR:", UPLOAD_DIR);
  const { id } = req.params;
  const filePath = path.resolve(UPLOAD_DIR, id);

  console.log("filePath:", filePath);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ ok: false, message: "File not found" });
  }

  return res.sendFile(filePath);
};
