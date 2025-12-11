import { Router } from "express";
import * as bookController from "../controllers/bookController.mjs";
// import { validate } from "../middleware/validate.mjs";
// import { postPatch, postValidation } from "../utils/helpers/validation.mjs";
// import { checkSchema } from "express-validator";
// import { isUser, isAuth, isAuthor } from "../middleware/isUser.mjs";


const router = Router();

router
  .route("/")
  .get(bookController.getAllBooks) // ok

export default router;