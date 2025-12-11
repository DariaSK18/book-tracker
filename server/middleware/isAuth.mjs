import AppError from "../utils/AppError.mjs";
import Book from "../models/book.mjs";

export const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  if (req.originalUrl.startsWith("/api"))
    return next(new AppError("Not authenticated", 401));
  return res.redirect("/login");
};

export const isUser = (req, res, next) => {
  res.locals.user = req.user || null;
  next();
};

export const isAuthor = async (req, res, next) => {
  const {
    params: { id },
    user,
  } = req;
  if (!user.id) return next(new AppError("Not authenticated", 401));

  const book = await Book.findByPk(id);
  if (!book) return next(new AppError("Book not found", 404));
  if (book.user_id.toString() !== user.id.toString())
    return next(new AppError("Not the author of the posted book", 403));
  next();
};
