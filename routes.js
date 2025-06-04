import { Router } from "express";

const router = Router();

import { getChapters } from "./controllers/getChapters.js";
import { uploadChapters } from "./controllers/uploadChapters.js";
import { cacheChapters } from "./middlewares/cache.js";

router.get("/chapters", cacheChapters, getChapters);
router.get("/chapters/:id", getChapters);

// Protected routes
import checkAdmin from "./middlewares/checkAdmin.js";

import upload from "./middlewares/upload.js";
router.post("/chapters", upload.single("file"), checkAdmin, uploadChapters);

export default router;
