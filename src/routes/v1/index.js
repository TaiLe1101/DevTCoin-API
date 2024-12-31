import express from "express";
import { welcomeRoute } from "./welcomeRoute";

const Router = express.Router();

Router.use("/", welcomeRoute);

export const APIsV1 = Router;
