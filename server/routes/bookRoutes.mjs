import { Router } from "express";
import * as bookController from "../controllers/bookController.mjs";
// import { validate } from "../middleware/validate.mjs";
// import { postPatch, postValidation } from "../utils/helpers/validation.mjs";
// import { checkSchema } from "express-validator";
import { isAuth } from "../middleware/isAuth.mjs";

const router = Router();

router
  .route("/")
  .get(bookController.getAllBooks) // ok
  .post(isAuth, bookController.uploadBook); // ok

router
  .route("/:id")
  .get(bookController.getOneBook) // ok
  .patch(
    isAuth,
    bookController.updateBook
  ) // ok
  .delete(isAuth, bookController.deleteBook); // ok

export default router;
