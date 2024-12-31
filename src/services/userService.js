/* eslint-disable no-unreachable */
/* eslint-disable no-useless-catch */

import { user } from "~/models/user";

export const userService = {
  async index() {
    try {
      const data = await user.find();
      return data;
    } catch (error) {
      throw error;
    }
  },

  async detail(id) {
    try {
      const data = await user.findByID(id);
      return data;
    } catch (error) {
      throw error;
    }
  },
};
