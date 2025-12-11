import { Router } from "express";
import * as bookController from "../controllers/bookController.mjs";
import { validate } from "../middleware/validate.mjs";
// import { postPatch, postValidation } from "../utils/helpers/validation.mjs";
// import { checkSchema } from "express-validator";
import { isAuth } from "../middleware/isAuth.mjs";
import { bookCreateValidation } from "../utils/helpers/bookValidation.mjs";

const router = Router();

router
  .route("/")
  .get(bookController.getAllBooks) // ok
  .post(isAuth, checkSchema(bookCreateValidation),
    validate, bookController.uploadBook); // ok

router
  .route("/:id")
  .get(bookController.getOneBook) // ok
  .patch(
    isAuth, isAuthor, checkSchema(postPatch), validate,
    bookController.updateBook
  ) // ok
  .delete(isAuth, isAuthor, bookController.deleteBook); // ok

export default router;
