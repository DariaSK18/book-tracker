import Button from "../components/Button";
import Rating from "../components/Rating";
import { useState } from "react";
import { updateBook as updateBookRating } from "../api/booksApi";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function BookActions({ book, onUpdateBook, onSaveRating }) {
  const [localRating, setLocalRating] = useState(book.rating || 0);
  const [showRatingPopup, setShowRatingPopup] = useState(false);

  if (!book) return null;

  const handleShare = () => console.log("Share", book.title);
  const handleContinueReading = () => console.log("Continue", book.title);
  const handleStartReading = () => console.log("Start", book.title);
  const handleMarkDone = async() => {
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
      rating: localRating
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
            {/* <Rating rating={book.rating || 0} /> */}
            {/* <div className="rating-input">
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
            </div> */}
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
          <Button
            text={"Continue Reading"}
            onClick={handleContinueReading}
            className={"action-btn"}
          />
          <Button
            text={<FontAwesomeIcon icon={faCheck} />}
            onClick={handleMarkDone}
            className={"action-btn icon-done"}
          />
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
