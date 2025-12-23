import Button from "../components/Button";
import Rating from "../components/Rating";
import { useState } from "react";
import { updateBook as updateBookRating } from "../api/booksApi";
import { addReadingLog as addReadingLogAPI } from "../api/readingLogApi";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function BookActions({ book, onUpdateBook, onSaveRating }) {
  const [localRating, setLocalRating] = useState(book.rating || 0);
  const [showRatingPopup, setShowRatingPopup] = useState(false);
  const [showLogInput, setShowLogInput] = useState(false);
  const [pagesInput, setPagesInput] = useState("");
  const [minutesInput, setMinutesInput] = useState("");

  if (!book) return null;

  const handleShare = () => console.log("Share", book.title);

  const handleStartReading = async () => {
    if (!onUpdateBook) return;

    const updatedBook = {
      ...book,
      reading_status: "now",
      pages_read: 0,
    };
    onUpdateBook(updatedBook);

    try {
      await updateBookRating(updatedBook.id, {
        reading_status: "now",
        pages_read: 0,
      });

      await addReadingLogAPI({
        book_id: updatedBook.id,
        date: new Date().toISOString().split("T")[0],
        pages_read: 0,
        minutes_read: 0,
      });
    } catch (err) {
      console.error("Failed to start reading", err);
    }
  };

  const handleContinueReading = async () => {
    if (!onUpdateBook) return;

    const pages = parseInt(pagesInput) || 0;
    const minutes = parseInt(minutesInput) || 0;

    const updatedBook = {
      ...book,
      pages_read: book.pages_read + pages,
    };
    onUpdateBook(updatedBook);

    try {
      await updateBookRating(updatedBook.id, {
        pages_read: updatedBook.pages_read,
      });
      await addReadingLogAPI({
        book_id: updatedBook.id,
        date: new Date().toISOString().split("T")[0],
        pages_read: pages,
        minutes_read: minutes,
      });
      setPagesInput("");
      setMinutesInput("");
      setShowLogInput(false);
    } catch (err) {
      console.error("Failed to continue reading", err);
    }
  };

  const handleMarkDone = async () => {
    if (!onUpdateBook) return;
    const updatedBook = {
      ...book,
      reading_status: "done",
      pages_read: book.pages_total,
      rating: localRating,
    };
    onUpdateBook(updatedBook);
    try {
      await updateBookRating(updatedBook.id, {
        reading_status: "done",
        pages_read: book.pages_total,
        rating: localRating,
      });
    } catch (err) {
      console.error(err);
    }
    setShowRatingPopup(true);
  };

  const handleStarClick = async (star) => {
    setLocalRating(star);
    if (onSaveRating) {
      await onSaveRating(book.id, star);
    }
    setShowRatingPopup(false);
  };

  switch (book.reading_status) {
    case "done":
      return (
        <div className="actions__done">
          <div>
            <Rating rating={localRating} />
          </div>
          <Button
            text={"Share"}
            onClick={handleShare}
            className={"action-btn"}
          />
          {showRatingPopup && (
            <div className="rating-popup">
              <p>Rate this book</p>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => handleStarClick(star)}
                  style={{
                    cursor: "pointer",
                    color: star <= localRating ? "#f5b301" : "#ccc",
                    fontSize: "24px",
                  }}
                >
                  ★
                </span>
              ))}
            </div>
          )}
        </div>
      );

    case "now":
      return (
        <div className="actions__now">
          {!showLogInput && (
            <Button
              text="Continue Reading"
              onClick={() => setShowLogInput(true)}
              className="action-btn"
            />
          )}
          {showLogInput && (
            <div className="log-input">
              <div className="log-input__inputs">
                <input
                  type="number"
                  placeholder="Pages read"
                  value={pagesInput}
                  onChange={(e) => setPagesInput(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Minutes read"
                  value={minutesInput}
                  onChange={(e) => setMinutesInput(e.target.value)}
                />
              </div>
             <div className="log-input__btns">
                <Button
                  text="Save Log"
                  onClick={handleContinueReading}
                  className="action-btn"
                />
                <Button
                  text="Cancel"
                  onClick={() => setShowLogInput(false)}
                  className="action-btn"
                />
             </div>
            </div>
          )}
          <Button
            text={<FontAwesomeIcon icon={faCheck} />}
            onClick={handleMarkDone}
            className="action-btn icon-done"
          />
          {/* <Button
            text={"Continue Reading"}
            onClick={handleContinueReading(pages, minutes)}
            className={"action-btn"}
          />
          <Button
            text={<FontAwesomeIcon icon={faCheck} />}
            onClick={handleMarkDone}
            className={"action-btn icon-done"}
          /> */}
        </div>
      );

    case "will":
      return (
        <div className="actions__will">
          <Button
            text={"Start Reading"}
            onClick={handleStartReading}
            className={"action-btn"}
          />
          <Button
            text={<FontAwesomeIcon icon={faCheck} />}
            onClick={handleMarkDone}
            className={"action-btn icon-done"}
          />
        </div>
      );

    default:
      return null;
  }
}
