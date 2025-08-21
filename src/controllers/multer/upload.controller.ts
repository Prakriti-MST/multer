
import { Request, Response, NextFunction } from "express";

export const uploadSingle = (req: Request, res: Response, next: NextFunction) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ ok: false, message: "No file uploaded" });

    const url = `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;

    return res.status(201).json({
      ok: true,
      file: {
        originalName: file.originalname,
        filename: file.filename,
        mimeType: file.mimetype,
        size: file.size,
        url
      }
    });
  } catch (err) {
    next(err);
  }
};

export const uploadMultiple = (req: Request, res: Response, next: NextFunction) => {
  try {
    const files = req.files as Express.Multer.File[] | undefined;
    if (!files || files.length === 0) return res.status(400).json({ ok: false, message: "No files uploaded" });

    const mapped = files.map(f => ({
      originalName: f.originalname,
      filename: f.filename,
      mimeType: f.mimetype,
      size: f.size,
      url: `${req.protocol}://${req.get("host")}/uploads/${f.filename}`
    }));

    return res.status(201).json({ ok: true, files: mapped });
  } catch (err) {
    next(err);
  }
};
