import Book from "./book.mjs";
import User from "./user.mjs";
import Note from "./note.mjs";

Book.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

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

Note.belongsTo(Book, {
  foreignKey: "book_id",
  as: "book",
});

User.hasMany(Note, {
  foreignKey: "user_id",
  as: "notes",
  onDelete: "CASCADE",
});

Note.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

export { Book, User, Note };
