import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connection.mjs";

class Rating extends Model {}

Rating.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1, max: 5 },
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
    modelName: "rating",
  }
);

export default Rating;
