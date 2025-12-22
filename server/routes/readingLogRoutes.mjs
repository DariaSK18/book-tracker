import { Router } from "express";
import * as readingLogController from "../controllers/readingLogController.mjs";
import { isAuth } from "../middleware/isAuth.mjs";

const router = Router();

router
  .route("/")
  .post(isAuth, readingLogController.addReadingLog)
  .get(isAuth, readingLogController.getReadingLogs);

export default router;
