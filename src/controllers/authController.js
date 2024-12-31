import { StatusCodes } from "http-status-codes";
import { authService } from "~/services/authService";
import { COOKIE_REFRESH_TOKEN_KEY, __PROD__ } from "~/utils/constants";

export const authController = {
  async register(req, res, next) {
    var dataBody = req.body;
    try {
      const data = await authService.register(dataBody);

      // API trả về có format như sau
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Đăng ký thành công",
        data,
      });
    } catch (error) {
      next(error);
    }
  },

  async login(req, res, next) {
    var dataBody = req.body;
    try {
      const data = await authService.login(dataBody);
      const { refreshToken, ...others } = data;
      const tenYearsInMs = 10 * 365 * 24 * 60 * 60 * 1000;
      res.cookie(COOKIE_REFRESH_TOKEN_KEY, refreshToken, {
        httpOnly: true,
        secure: __PROD__,
        sameSite: __PROD__ ? "none" : "lax",
        maxAge: tenYearsInMs,
      });

      // API trả về có format như sau
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Đăng nhập thành công",
        data: others,
      });
    } catch (error) {
      next(error);
    }
  },

  async refresh(req, res, next) {
    const refreshToken = req.cookies[COOKIE_REFRESH_TOKEN_KEY];
    try {
      const { newAccessToken, newRefreshToken } =
        await authService.refreshToken(refreshToken);
        console.log({newRefreshToken})

      const tenYearsInMs = 10 * 365 * 24 * 60 * 60 * 1000;
      res.cookie(COOKIE_REFRESH_TOKEN_KEY, newRefreshToken, {
        httpOnly: true,
        secure: __PROD__,
        sameSite: __PROD__ ? "none" : "lax",
        maxAge: tenYearsInMs,
      });

      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Refresh thành công",
        data: newAccessToken,
      });
    } catch (error) {
      next(error);
    }
  },

  async logout(req, res, next) {
    try {
      const data = await authService.logout(
        req.cookies[COOKIE_REFRESH_TOKEN_KEY]
      );

      if (req.cookies[COOKIE_REFRESH_TOKEN_KEY]) {
        res.clearCookie(COOKIE_REFRESH_TOKEN_KEY);
      }

      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Đăng xuất thành công",
        data,
      });
    } catch (error) {
      next(error);
    }
  },
};
