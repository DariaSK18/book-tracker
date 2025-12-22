import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connection.mjs";

class ReadingLog extends Model {}

ReadingLog.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    pages_read: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    minutes_read: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "user", key: "id" },
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "book", key: "id" },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "reading_log",
    indexes: [
      {
        unique: true,
        fields: ["user_id", "book_id", "date"],
      },
    ],
  }
);

export default ReadingLog;
