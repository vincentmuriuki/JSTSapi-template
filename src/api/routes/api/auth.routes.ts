import * as express from "express";
import AuthController from "../../controllers/AuthController";
import passport from "../../../config/passport";
import catchErrors from "../../../utils/helper";
import { validation } from '../../validation/validation';

const authRouter = express.Router();

authRouter.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

// authRouter.get(
//   "/auth/facebook/callback",
//   passport.authenticate("facebook", {
//     failureRedirect: `${process.env.FRONTEND_URL}/auth/login`,
//   }),
//   catchErrors(AuthController.facebookSignIn)
// );

authRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// authRouter.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: `${process.env.FRONTEND_URL}/login`,
//   }),
//   catchErrors(AuthController.googleSignIn)
// );

authRouter.post('/auth/signup', validation, catchErrors(AuthController.registerUser));

authRouter.post('/auth/signin', validation, catchErrors(AuthController.signIn));


export default authRouter;