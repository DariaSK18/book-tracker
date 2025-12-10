import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is missing in .env!");
  process.exit(1);
}


const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

export default sequelize;