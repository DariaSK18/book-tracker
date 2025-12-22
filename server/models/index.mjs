import Book from "./book.mjs";
import User from "./user.mjs";
import Note from "./note.mjs";
import Progress from "./progress.mjs";
import Rating from "./rating.mjs";
import Category from "./category.mjs";
import BookCategory from "./bookCategory.mjs";
import ReadingLog from "./readingLog.mjs";
import Collection from "./collection.mjs";

Book.belongsTo(User, { foreignKey: "user_id", as: "user" });

User.hasMany(Book, {
  foreignKey: "user_id",
  as: "books",
  onDelete: "CASCADE",
});

Book.hasMany(Note, {
  foreignKey: "book_id",
  as: "notes",
  onDelete: "CASCADE",
});

Note.belongsTo(Book, { foreignKey: "book_id", as: "book" });

User.hasMany(Note, {
  foreignKey: "user_id",
  as: "notes",
  onDelete: "CASCADE",
});

Note.belongsTo(User, { foreignKey: "user_id", as: "user" });

Book.hasMany(Rating, {
  foreignKey: "book_id",
  as: "ratings",
  onDelete: "CASCADE",
});
Rating.belongsTo(Book, { foreignKey: "book_id", as: "book" });

User.hasMany(Rating, {
  foreignKey: "user_id",
  as: "ratings",
  onDelete: "CASCADE",
});
Rating.belongsTo(User, { foreignKey: "user_id", as: "user" });

Book.hasMany(Progress, {
  foreignKey: "book_id",
  as: "progresses",
  onDelete: "CASCADE",
});
Progress.belongsTo(Book, { foreignKey: "book_id", as: "book" });

User.hasMany(Progress, {
  foreignKey: "user_id",
  as: "progresses",
  onDelete: "CASCADE",
});
Progress.belongsTo(User, { foreignKey: "user_id", as: "user" });

Book.belongsToMany(Category, {
  through: BookCategory,
  foreignKey: "book_id",
  as: "categories",
});

Category.belongsToMany(Book, {
  through: BookCategory,
  foreignKey: "category_id",
  as: "books",
});

User.hasMany(ReadingLog, {
  foreignKey: "user_id",
  as: "readingLogs",
  onDelete: "CASCADE",
});

ReadingLog.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

Book.hasMany(ReadingLog, {
  foreignKey: "book_id",
  as: "readingLogs",
  onDelete: "SET NULL",
});

ReadingLog.belongsTo(Book, {
  foreignKey: "book_id",
  as: "book",
});
User.hasMany(Collection, {
  foreignKey: "user_id",
  as: "collections",
  onDelete: "CASCADE",
});

Collection.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

Collection.hasMany(Book, {
  foreignKey: "collection_id",
  as: "books",
  onDelete: "SET NULL",
});

Book.belongsTo(Collection, {
  foreignKey: "collection_id",
  as: "collection",
});


export { Book, User, Note, Progress, Rating, Category, BookCategory, ReadingLog, Collection };
