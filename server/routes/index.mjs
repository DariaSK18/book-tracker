import { Router } from "express";
import userRoutes from "./userRoutes.mjs";
import bookRoutes from "./bookRoutes.mjs";

const router = Router()

router.use('/user', userRoutes)
router.use('/book', bookRoutes)

export default router