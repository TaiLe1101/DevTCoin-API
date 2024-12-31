import express from "express";
import { projectCategoryController } from "~/controllers/projectCategoryController";
import { projectCategoryValidation } from "~/validations/projectCategoryValidation";

const Router = express.Router();

Router.route("/").get(projectCategoryController.index);

Router.route("/create").post(
  projectCategoryValidation.create,
  projectCategoryController.create
);

Router.route("/update/:id").put(
  projectCategoryValidation.update,
  projectCategoryController.update
);

Router.route("/delete/:id").delete(projectCategoryController.delete);

Router.route("/:id").get(projectCategoryController.detail);

export const projectCategoryRoute = Router;
