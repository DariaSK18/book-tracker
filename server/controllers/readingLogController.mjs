import ReadingLog from "../models/readingLog.mjs";
import { Book } from "../models/index.mjs";
import { sendResponse } from "../utils/helpers/sendResponse.mjs";
import AppError from "../utils/AppError.mjs";

// --- Add a new reading log ---
export const addReadingLog = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { book_id, date, pages_read = 0, minutes_read = 0 } = req.body;

    if (!book_id || !date) {
      return next(new AppError("book_id and date are required", 400));
    }
    if (pages_read < 0 || minutes_read < 0) {
      return next(new AppError("Values must be positive", 400));
    }

    const book = await Book.findByPk(book_id);
    if (!book || book.user_id !== userId) {
      return next(new AppError("Book not found", 404));
    }

    console.log("Adding log:", { userId, book_id, date, pages_read, minutes_read });

    const existingLog = await ReadingLog.findOne({
      where: { user_id: userId, date, book_id },
    });

    if (existingLog) {
      await existingLog.update({
        pages_read: existingLog.pages_read + pages_read,
        minutes_read: existingLog.minutes_read + minutes_read,
      });
    } else {
      await ReadingLog.create({
        user_id: userId,
        book_id,
        date,
        pages_read,
        minutes_read,
      });
    }

    const logs = await ReadingLog.findAll({
      where: { user_id: userId },
      order: [["date", "ASC"]],
      include: [{ model: Book, as: "book" }],
    });

    sendResponse(res, 200, { logs });
  } catch (err) {
    next(new AppError("Server error", 500, err));
  }
};

// --- Get all reading logs for a user ---
export const getReadingLogs = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const logs = await ReadingLog.findAll({
      where: { user_id: userId },
      order: [["date", "ASC"]],
      include: [{ model: Book, as: "book" }],
    });

    sendResponse(res, 200, { logs });
  } catch (err) {
    next(new AppError("Server error", 500, err));
  }
};
