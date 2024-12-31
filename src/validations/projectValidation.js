// DevT | example exampleValidation file
import { StatusCodes } from "http-status-codes";
import Joi from "joi";

import ApiError from "~/utils/ApiError";

export const projectValidation = {
  async create(req, res, next) {
    try {
      const correctCondition = Joi.object({
        title: Joi.string().required().min(1).max(255).trim().strict(),
        path: Joi.string().required().min(1).max(255).trim().strict(),
        projectCategoryId: Joi.number().required(),
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

  async update(req, res, next) {
    try {
      const correctCondition = Joi.object({
        title: Joi.string().required().min(1).max(255).trim().strict(),
        path: Joi.string().required().min(1).max(255).trim().strict(),
        projectCategoryId: Joi.number().required(),
      });

      await correctCondition.validateAsync(req.body, {
        abortEarly: false,
        allowUnknown: true,
      });

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
