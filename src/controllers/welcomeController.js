import { StatusCodes } from "http-status-codes";

export const welcomeController = {
  async index(req, res, next) {
    try {
      // API trả về có format như sau
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Chào",
      });
    } catch (error) {
      next(error);
    }
  },
};
