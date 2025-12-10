import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connection.mjs";

class Progress extends Model {}

Progress.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    pages_read: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: { min: 0 },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "user", key: "id" },
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "book", key: "id" },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "progress",
  }
);

export default Progress;
