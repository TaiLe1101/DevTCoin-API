import { StatusCodes } from "http-status-codes";
import { projectCategoryService } from "~/services/projectCategoryService";

export const projectCategoryController = {
  async index(req, res, next) {
    try {
      const data = await projectCategoryService.index();

      // API trả về có format như sau
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Lấy tất cả danh mục dự án thành công",
        data,
      });
    } catch (error) {
      next(error);
    }
  },

  async detail(req, res, next) {
    const id = req.params.id;
    try {
      const data = await projectCategoryService.detail(id);

      // API trả về có format như sau
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Lấy danh mục dự án thành công",
        data,
      });
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    const reqBody = req.body;
    try {
      const data = await projectCategoryService.create(reqBody);

      // API trả về có format như sau
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Tạo danh mục dự án thành công",
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
      const data = await projectCategoryService.update(id, reqBody);

      // API trả về có format như sau
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Chỉnh sửa danh mục dự án thành công",
        data,
      });
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    const { id } = req.params;
    try {
      const data = await projectCategoryService.delete(id);

      // API trả về có format như sau
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Xóa danh mục dự án thành công",
        data,
      });
    } catch (error) {
      next(error);
    }
  },
};
