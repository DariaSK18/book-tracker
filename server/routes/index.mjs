import { Router } from "express";
import userRoutes from "./userRoutes.mjs";
import bookRoutes from "./bookRoutes.mjs";
import readingLogRoutes from "./readingLogRoutes.mjs";
import statisticRoutes from "./statisticRoutes.mjs"


const router = Router()

router.use('/user', userRoutes)
router.use('/book', bookRoutes)
router.use('/reading-log', readingLogRoutes)
router.use('/statistic', statisticRoutes)

export default router