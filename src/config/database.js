import { Sequelize } from "sequelize";
import { env } from "./environment";

export const sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PWD, {
  host: env.DB_HOST,
  port: env.DB_PORT,
  dialect: "mysql",
  logging: true,
});

export const CONNECT_DB = async () => {
  try {
    await sequelize.authenticate();
  } catch (error) {
    throw error;
  }
};

export const DISCONNECT_DB = async () => {
  try {
    await sequelize.close();
    console.log("[INFO] 👉 Kết nối Database đã được đóng ✔");
  } catch (error) {
    console.error("[ERROR] 👉 Lỗi khi đóng kết nối Database:", error);
    throw error;
  }
};

export const syncModels = async () => {
  try {
    await sequelize.sync({ alter: true }); // Dùng alter để tự động cập nhật cấu trúc bảng
    console.log("[INFO] 👉 Models đã được đồng bộ với cơ sở dữ liệu!");
  } catch (error) {
    console.error("[ERROR] 👉 Lỗi khi đồng bộ models:", error);
  }
};
