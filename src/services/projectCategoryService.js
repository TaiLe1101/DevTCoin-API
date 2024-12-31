/* eslint-disable no-unreachable */
/* eslint-disable no-useless-catch */

import { StatusCodes } from "http-status-codes";
import { projectCategory } from "~/models/projectCategory";
import ApiError from "~/utils/ApiError";

export const projectCategoryService = {
  async index() {
    try {
      const data = await projectCategory.find();
      return data;
    } catch (error) {
      throw error;
    }
  },

  async detail(id) {
    try {
      const data = await projectCategory.findByID(id);
      return data;
    } catch (error) {
      throw error;
    }
  },

  async create(reqBody) {
    try {
      const data = await projectCategory.create(reqBody);
      return data;
    } catch (error) {
      throw error;
    }
  },

  async update(id, reqBody) {
    try {
      const data = await projectCategory.updateByID(id, reqBody);

      if (!data) {
        throw new ApiError(StatusCodes.NOT_FOUND, `ID ${id} Không tồn tại`);
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  async delete(id) {
    try {
      const data = await projectCategory.deleteByID(id);

      if (!data) {
        throw new ApiError(StatusCodes.NOT_FOUND, `ID ${id} Không tồn tại`);
      }

      return data;
    } catch (error) {
      throw error;
    }
  },
};
