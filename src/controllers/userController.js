import { StatusCodes } from "http-status-codes";
import { userService } from "~/services/userService";

export const userController = {
  async index(req, res, next) {
    try {
      const data = await userService.index();

      // API trả về có format như sau
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Lấy tất cả người dùng thành công",
        data,
      });
    } catch (error) {
      next(error);
    }
  },

  async detail(req, res, next) {
    const id = req.params.id
    try {
      const data = await userService.detail(id);

      // API trả về có format như sau
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Lấy thông tin người dùng thành công",
        data,
      });
    } catch (error) {
      next(error);
    }
  },
};
