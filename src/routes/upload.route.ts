// src/routes/upload.route.ts
import { Router } from "express";
import { upload } from "../config/multer.config";
import { uploadSingle, uploadMultiple } from "../controllers/multer/upload.controller";

const router = Router();

// POST /api/upload/single  -> form field 'file'
router.post("/single", upload.single("file"), uploadSingle);

// POST /api/upload/multiple -> form field 'files' (max 5)
router.post("/multiple", upload.array("files", 5), uploadMultiple);

export default router;
