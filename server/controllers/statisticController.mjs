import ReadingLog from "../models/readingLog.mjs";
import { sendResponse } from "../utils/helpers/sendResponse.mjs";
import AppError from "../utils/AppError.mjs";

export const getReadingStatistics = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const logs = await ReadingLog.findAll({
      where: { user_id: userId },
      order: [["date", "ASC"]],
    });

    if (!logs.length) {
      return sendResponse(res, 200, {
        data: {
          pagesRead: 0,
          totalTime: 0,
          booksRead: 0,
          totalReadingDays: 0,
          bestDayPages: 0,
          bestDayMinutes: 0,
          readingSpeed: 0,
          longestStreak: 0,
        },
      });
    }

    let pagesRead = 0;
    let totalTime = 0;
    let bestDayPages = 0;
    let bestDayMinutes = 0;

    const booksSet = new Set();
    const readingDaysSet = new Set();

    logs.forEach((log) => {
      pagesRead += log.pages_read;
      totalTime += log.minutes_read;

      booksSet.add(log.book_id);
      readingDaysSet.add(log.date);

      if (log.pages_read > bestDayPages) {
        bestDayPages = log.pages_read;
      }

      if (log.minutes_read > bestDayMinutes) {
        bestDayMinutes = log.minutes_read;
      }
    });

    const uniqueDates = [...readingDaysSet]
      .map((d) => new Date(d))
      .sort((a, b) => a - b);

    let streak = 0;
    let maxStreak = 0;
    let previousDate = null;

    uniqueDates.forEach((date) => {
      if (previousDate) {
        const diff = (date - previousDate) / (1000 * 3600 * 24);

        streak = diff === 1 ? streak + 1 : 1;
      } else {
        streak = 1;
      }

      maxStreak = Math.max(maxStreak, streak);
      previousDate = date;
    });

    const readingSpeed = totalTime > 0 ? pagesRead / (totalTime / 60) : 0;

    sendResponse(res, 200, {
      data: {
        pagesRead,
        totalTime,
        booksRead: booksSet.size,
        totalReadingDays: readingDaysSet.size,
        bestDayPages,
        bestDayMinutes,
        readingSpeed: Math.round(readingSpeed * 100) / 100,
        longestStreak: maxStreak,
      },
    });
  } catch (err) {
    next(new AppError("Server error", 500, err));
  }
};
