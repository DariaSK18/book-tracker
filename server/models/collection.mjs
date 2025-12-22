import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connection.mjs";

class Collection extends Model {}

Collection.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    label: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "collection",
    freezeTableName: true,
    underscored: true,
    timestamps: true,
  }
);

export default Collection;
