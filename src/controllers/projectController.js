import { StatusCodes } from "http-status-codes";
import { projectService } from "~/services/projectService";

export const projectController = {
  async index(req, res, next) {
    try {
      const data = await projectService.index();

      // API trả về có format như sau
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Lấy tất cả dự án thành công",
        data,
      });
    } catch (error) {
      next(error);
    }
  },

  async detail(req, res, next) {
    const id = req.params.id;
    try {
      const data = await projectService.detail(id);

      // API trả về có format như sau
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Lấy thông tin dự án thành công",
        data,
      });
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    const reqBody = req.body;
    try {
      const data = await projectService.create(reqBody);

      // API trả về có format như sau
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Tạo dự án thành công",
        data,
      });
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    const reqBody = req.body;
    const { id } = req.params;
    try {
      const data = await projectService.update(id, reqBody);

      // API trả về có format như sau
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Chỉnh sửa dự án thành công",
        data,
      });
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    const { id } = req.params;
    try {
      const data = await projectService.delete(id);

      // API trả về có format như sau
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Xóa danh dự án thành công",
        data,
      });
    } catch (error) {
      next(error);
    }
  },
};
