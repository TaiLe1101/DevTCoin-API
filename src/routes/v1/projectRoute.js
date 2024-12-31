import express from "express";
import { projectController } from "~/controllers/projectController";
import { projectValidation } from "~/validations/projectValidation";

const Router = express.Router();

Router.route("/").get(projectController.index);

Router.route("/create").post(
  projectValidation.create,
  projectController.create
);

Router.route("/update/:id").put(
  projectValidation.update,
  projectController.update
);

Router.route("/delete/:id").delete(projectController.delete);

Router.route("/:id").get(projectController.detail);

export const projectRoute = Router;
