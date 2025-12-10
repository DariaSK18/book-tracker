import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connection.mjs";

class BookCategory extends Model {}

BookCategory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "book",
        key: "id",
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "category",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "book_category",
    indexes: [
      {
        unique: true,
        fields: ["book_id", "category_id"],
      },
    ],
  }
);

export default BookCategory;