import express from "express";

import { welcomeController } from "~/controllers/welcomeController";

const Router = express.Router();

Router.route("/").get(welcomeController.index);

export const welcomeRoute = Router;
