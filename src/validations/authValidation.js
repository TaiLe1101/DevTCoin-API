// DevT | example exampleValidation file
import { StatusCodes } from "http-status-codes";
import Joi from "joi";

import ApiError from "~/utils/ApiError";
import { JWT_RULE, JWT_RULE_MESSAGE } from "~/utils/constants";

export const authValidation = {
  async register(req, res, next) {
    try {
      const correctCondition = Joi.object({
        firstName: Joi.string().required().min(1).max(255).trim().strict(),
        lastName: Joi.string().required().min(1).max(255).trim().strict(),
        username: Joi.string().required().min(1).max(255).trim().strict(),
        password: Joi.string().required().min(6).trim().strict(),
      });

      await correctCondition.validateAsync(req.body, { abortEarly: false });

      next();
    } catch (error) {
      const errorMessages = new Error(error).message;
      const apiError = new ApiError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        errorMessages
      );
      next(apiError);
    }
  },

  async login(req, res, next) {
    try {
      const correctCondition = Joi.object({
        username: Joi.string().required().min(1).max(255).trim().strict(),
        password: Joi.string()
          .required()
          .min(
            req.body.username.toUpperCase() == "DEV" ||
              req.body.username.toUpperCase() == "ADMIN"
              ? 1
              : 6
          )
          .trim()
          .strict(),
      });

      await correctCondition.validateAsync(req.body, { abortEarly: false });

      next();
    } catch (error) {
      const errorMessages = new Error(error).message;
      const apiError = new ApiError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        errorMessages
      );
      next(apiError);
    }
  },

  async refresh(req, res, next) {
    try {
      const correctCondition = Joi.object({
        rft: Joi.string()
          .required()
          .pattern(JWT_RULE)
          .message(JWT_RULE_MESSAGE),
      });

      await correctCondition.validateAsync(req.cookies, { abortEarly: false });

      next();
    } catch (error) {
      const errorMessages = new Error(error).message;
      const apiError = new ApiError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        errorMessages
      );
      next(apiError);
    }
  },

  async logout(req, res, next) {
    try {
      const correctCondition = Joi.object({
        refreshToken: Joi.string()
          .required()
          .pattern(JWT_RULE)
          .message(JWT_RULE_MESSAGE),
      });

      await correctCondition.validateAsync(req.cookies, { abortEarly: false });

      next();
    } catch (error) {
      const errorMessages = new Error(error).message;
      const apiError = new ApiError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        errorMessages
      );
      next(apiError);
    }
  },
};
