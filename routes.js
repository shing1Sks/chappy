import { Router } from "express";

const router = Router();

import { getChapters } from "./controllers/getChapters.js";
import { uploadChapters } from "./controllers/uploadChapters.js";

router.get("/chapters/:id", getChapters);

// Protected routes
import checkAdmin from "./middlewares/checkAdmin.js";
router.use(checkAdmin);

import upload from "./middlewares/upload.js";
router.post("/chapters", upload.single("file"), uploadChapters);

export default router;
