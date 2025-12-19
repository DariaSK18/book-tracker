import { Router } from "express";
import * as bookController from "../controllers/bookController.mjs";
import { validate } from "../middleware/validate.mjs";
import { checkSchema } from "express-validator";
import { isAuth, isAuthor } from "../middleware/isAuth.mjs";
import {
  bookCreateValidation,
  bookPatchValidation,
} from "../utils/helpers/bookValidation.mjs";

const router = Router();

router
  .route("/")
  .get(isAuth, bookController.getAllBooks) // ok
  .post(
    isAuth,
    checkSchema(bookCreateValidation),
    validate,
    bookController.uploadBook
  ); // ok

router.get("/collections", isAuth, bookController.getCollections);
router.get(
  "/collection/:collection", isAuth,
  bookController.getBooksByCollection
);

router.patch("/:id/favourite", isAuth, bookController.toggleFavourite);

router
  .route("/:id")
  .get(bookController.getOneBook) // ok
  .patch(
    isAuth,
    isAuthor,
    checkSchema(bookPatchValidation),
    validate,
    bookController.updateBook
  ) // ok
  .delete(isAuth, isAuthor, bookController.deleteBook); // ok

export default router;
