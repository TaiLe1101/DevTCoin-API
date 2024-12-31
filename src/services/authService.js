/* eslint-disable no-unreachable */
/* eslint-disable no-useless-catch */

import * as bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import * as jwt from "jsonwebtoken";
import { env } from "~/config/environment";
import { role } from "~/models/role";
import { token } from "~/models/token";

import { user as userModel } from "~/models/user";
import ApiError from "~/utils/ApiError";

export const authService = {
  async register(dataBody) {
    const { username, password, firstName, lastName } = dataBody;
    try {
      const roles = await role.find();

      const userExists = await userModel.findOneByUsername(username);

      if (userExists) {
        throw new ApiError(StatusCodes.CONFLICT, "Username is exists!!!");
      }

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      const result = await userModel.create({
        firstName,
        lastName,
        username,
        password: hashedPassword,
      });

      return result;
    } catch (error) {
      throw error;
    }
  },

  async login(dataBody) {
    const { username, password } = dataBody;
    try {
      const userExists = await userModel.findOneByUsername(username);

      if (!userExists) {
        throw new ApiError(
          StatusCodes.UNAUTHORIZED,
          "Username or password invalid"
        );
      }

      const isPasswordValid = bcrypt.compareSync(password, userExists.password);

      if (!isPasswordValid) {
        throw new ApiError(
          StatusCodes.UNAUTHORIZED,
          "Username or password invalid"
        );
      }

      const accessToken = generateToken(
        { id: userExists.id.toString() },
        env.JWT_ACCESS_KEY,
        "1d"
      );

      const refreshToken = generateToken(
        { id: userExists.id.toString() },
        env.JWT_REFRESH_KEY,
        "365d"
      );

      token.create({ refreshToken });

      return { ...userExists, accessToken, refreshToken };
    } catch (error) {
      throw error;
    }
  },

  async refreshToken(refreshToken) {
    try {
      let newAccessToken;
      let newRefreshToken;
      console.log(refreshToken);

      const isDeleted = await token.deleteByID(refreshToken);

      console.log(isDeleted);

      if (isDeleted) {
        jwt.verify(refreshToken, env.JWT_REFRESH_KEY, (err, user) => {
          if (err) {
            throw new ApiError(
              StatusCodes.UNPROCESSABLE_ENTITY,
              "Token không hợp lệ"
            );
          } else {
            newAccessToken = generateToken(
              { _id: user._id },
              env.JWT_ACCESS_KEY,
              "1d"
            );

            newRefreshToken = generateToken(
              { _id: user._id },
              env.JWT_REFRESH_KEY,
              "365d"
            );
          }
        });

        if (!newAccessToken || !newRefreshToken) {
          throw new ApiError();
        }

        token.create({ refreshToken: newRefreshToken });

        return { newAccessToken, newRefreshToken };
      } else {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "Bạn không có quyền này");
      }
    } catch (error) {
      throw error;
    }
  },

  async logout(refreshToken) {
    try {
      const isDeleted = await token.deleteByID(refreshToken);

      if (!!isDeleted) {
        return true;
      } else {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "Bạn không có quyền này");
      }
    } catch (error) {
      throw error;
    }
  },
};

const generateToken = (data, secretKey, expiresIn) => {
  try {
    return jwt.sign(data, secretKey, {
      expiresIn,
    });
  } catch (error) {
    throw error;
  }
};
