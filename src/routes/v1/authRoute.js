import express from "express";
import { authController } from "~/controllers/authController";
import { authMiddleware } from "~/middlewares/authMiddleware";
import { authValidation } from "~/validations/authValidation";

const Router = express.Router();

Router.route("/register").post(
  authValidation.register,
  authController.register
);

Router.route("/login").post(authValidation.login, authController.login);

Router.route("/refreshToken").post(
  authValidation.refresh,
  authController.refresh
);

Router.route("/logout").post(authMiddleware.verifyToken, authController.logout);

export const authRoute = Router;
