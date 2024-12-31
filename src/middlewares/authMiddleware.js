import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { env } from "~/config/environment";
import { Role } from "~/models/role";
import { User } from "~/models/user";
import ApiError from "~/utils/ApiError";

export const authMiddleware = {
  verifyToken(req, res, next) {
    try {
      const { authorization } = req.headers;
      if (authorization) {
        const accessToken = authorization.split(" ")[1];
        jwt.verify(accessToken, env.JWT_ACCESS_KEY, (err, user) => {
          if (err) {
            throw new ApiError(
              StatusCodes.FORBIDDEN,
              "Có lỗi xảy ra liên quan đến token"
            );
          } else {
            req.user = user;
            next();
          }
        });
      } else {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "Bạn chưa đăng nhập");
      }
    } catch (error) {
      next(error);
    }
  },

  async verifyAdmin(req, res, next) {
    try {
      if (req.user) {
        const user = await User.findOne({ _id: req.user._id });
        const role = await Role.findOne({ _id: user.roleId });
        if (
          role._id.equals("65868b2f3823ab4033f4c1e2") &&
          role.name === "admin"
        ) {
          next();
        } else {
          throw new ApiError(
            StatusCodes.UNAUTHORIZED,
            "Bạn không có quyền truy cập"
          );
        }
      }
    } catch (error) {
      next(error);
    }
  },
};
