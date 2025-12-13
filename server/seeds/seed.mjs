import sequelize from "../config/connection.mjs";
import { Book, BookCategory, Category, Note, Progress, Rating, User} from "../models/index.mjs";
import { hashPassword } from "../utils/helpers/hashPassword.mjs";

import usersData from "./users.json" with { type: "json" };
import booksData from "./books.json" with { type: "json" };
import bookCategoryData from "./bookCategory.json" with { type: "json" };
import categoryData from "./category.json" with { type: "json" };
import noteData from "./note.json" with { type: "json" };
import progressData from "./progress.json" with { type: "json" };
import ratingData from "./rating.json" with { type: "json" };

const hashUserPasswords = async() => {
  for (const user of usersData) {
    user.password = await hashPassword(user.password);
  }
};


const seedDatabase = async () => {
   await hashUserPasswords();
  await sequelize.sync({ force: true });
  await User.bulkCreate(usersData); 
  await Category.bulkCreate(categoryData);
  await Book.bulkCreate(booksData);
  await BookCategory.bulkCreate(bookCategoryData);
  
  await Note.bulkCreate(noteData);
  await Progress.bulkCreate(progressData);
  await Rating.bulkCreate(ratingData);

  process.exit(0);
};

seedDatabase();