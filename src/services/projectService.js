/* eslint-disable no-unreachable */
/* eslint-disable no-useless-catch */

import { StatusCodes } from "http-status-codes";
import { project } from "~/models/project";
import ApiError from "~/utils/ApiError";

export const projectService = {
  async index() {
    try {
      const data = await project.find();
      return data;
    } catch (error) {
      throw error;
    }
  },

  async detail(id) {
    try {
      const data = await project.findByID(id);
      return data;
    } catch (error) {
      throw error;
    }
  },

  async create(reqBody) {
    try {
      const data = await project.create(reqBody);
      return data;
    } catch (error) {
      throw error;
    }
  },

  async update(id, reqBody) {
    try {
      const data = await project.updateByID(id, reqBody);

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
      const data = await project.deleteByID(id);

      if (!data) {
        throw new ApiError(StatusCodes.NOT_FOUND, `ID ${id} Không tồn tại`);
      }

      return data;
    } catch (error) {
      throw error;
    }
  },
};
