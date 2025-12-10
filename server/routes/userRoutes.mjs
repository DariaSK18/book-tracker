import { Router } from "express";
import * as userController from "../controllers/userController.mjs";
import * as authController from "../controllers/authController.mjs";
import { validate } from "../middleware/validate.mjs";
import {
  userPatch,
  signupValidation,
  userLogin,
} from "../utils/helpers/validation.mjs";
import { checkSchema } from "express-validator";
import { isAuth } from "../middleware/isAuth.mjs";

const router = Router();

router
  .route("/")
  .get(userController.getAllUsers)
  .post(checkSchema(signupValidation), validate, authController.createUser);

router.route("/:id").get(userController.getOneUser);

router
  .route("/me")
  .get( isAuth,(req, res) => {
//   console.log('req.user:', req.user);
  if (!req.user) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  res.setHeader("Cache-Control", "no-store");
  res.json({ user: req.user });
} )
  .patch(isAuth, checkSchema(userPatch), validate, userController.updateUser) 
  .delete(isAuth, userController.deleteUser);

router.route("/login").post(checkSchema(userLogin), validate,  authController.loginUser);

router.route("/logout").post(isAuth, authController.logoutUser); 

export default router;