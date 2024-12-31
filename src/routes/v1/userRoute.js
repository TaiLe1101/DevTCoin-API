import express from "express";
import { userController } from "~/controllers/userController";

const Router = express.Router();

Router.route("/").get(userController.index);

Router.route("/:id").get(userController.detail);

export const userRoute = Router;
