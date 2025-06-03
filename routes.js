import { Router } from "express";

const router = Router();

import { getChapters } from "./controllers.js";

router.get("/chapters/:id", getChapters);

export default router;
