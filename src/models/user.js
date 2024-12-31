import { DataTypes, Model } from "sequelize";
import { sequelize } from "~/config/database"; // Kết nối Sequelize

class User extends Model {
  static associate(models) {
    // Định nghĩa các quan hệ tại đây (nếu có)
    // Ví dụ: User.hasMany(models.Post);
  }
}

User.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dateOfBirth: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    phoneNumberCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    verifyCode: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize, // Đối tượng kết nối Sequelize
    modelName: "User", // Tên của model
    tableName: "Users", // Tên bảng trong cơ sở dữ liệu (nếu không đặt, Sequelize sẽ dùng dạng số nhiều của modelName)
    timestamps: true, // Tự động thêm `createdAt` và `updatedAt`
  }
);

export default User;
