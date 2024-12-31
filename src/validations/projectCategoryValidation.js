// DevT | example exampleValidation file
import { StatusCodes } from "http-status-codes";
import Joi from "joi";

import ApiError from "~/utils/ApiError";

export const projectCategoryValidation = {
  async create(req, res, next) {
    try {
      const correctCondition = Joi.object({
        name: Joi.string().required().min(1).max(255).trim().strict(),
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
        name: Joi.string().required().min(1).max(255).trim().strict(),
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
