import { Router } from "express";
import * as statisticController from "../controllers/statisticController.mjs";
import { isAuth } from "../middleware/isAuth.mjs";

const router = Router();

router.get("/", isAuth, statisticController.getReadingStatistics);

export default router;