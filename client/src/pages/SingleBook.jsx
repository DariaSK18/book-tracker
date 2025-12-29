import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getBookById, deleteBook } from "../api/booksApi";
import ConfirmModal from "../components/ConfirmModal";

import ProgressBar from "../components/ProgressBar";
import BookActions from "../components/BookActions";
import Rating from "../components/Rating";
import Button from "../components/Button";
import { useAlert } from "../context/AlertContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faClock,
  faCommentDots,
  faRankingStar,
  faChildren,
} from "@fortawesome/free-solid-svg-icons";

export default function SingleBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
   const [showConfirm, setShowConfirm] = useState(false);
  const { showAlert } = useAlert();

  useEffect(() => {
    async function fetchBook() {
      try {
        const res = await getBookById(id);
        setBook(res.data);
      } catch (err) {
        console.error("Failed to load books:", err);
      }
    }

    if (id) fetchBook();
  }, [id]);
  // console.log(book);

  async function handleDeleteBook(id) {
    // const confirmed = window.confirm(
    //   "Are you sure you want to delete this book?"
    // );
    // if (!confirmed) return;

    try {
      await deleteBook(id);
      setBook(null);
      navigate("/");
      // setBook((prev) => prev.filter((book) => book.id !== id));
      showAlert("success", "Book deleted successfully");
    } catch (err) {
      // alert(err.message);
      showAlert("error", err.message);
    }
  }

  const statusMap = {
    will: "Not started yet",
    now: "Currently reading",
    done: "Book finished",
  };

  if (!book) return <p>Loading...</p>;
  // console.log(book);

  const progress =
    book.pages_total > 0
      ? Math.round((book.pages_read / book.pages_total) * 100)
      : 0;

  return (
    <div className="single-book">
      <div className="single-book__top-section">
        <div className="single-book__cover">
          <img
            src={book.image_url || "/images/no_cover_available.png"}
            style={{ width: "180px" }}
            alt={book.title}
          />
        </div>
        <div className="single-book__content book">
          <div className="book__status status">
            <span className="status__title">
              {statusMap[book.reading_status] || "Unknown status"}
            </span>
            <span className="status__pages">
              <ProgressBar value={progress}>
                {book.pages_read}/{book.pages_total}
              </ProgressBar>
            </span>
          </div>

          <div className="book__info">
            <h1 className="book__title">{book.title}</h1>
            <p className="book__author">by {book.author}</p>
            <p className="book__genre">{book.genre}</p>
            <p className="book__collection">{book.collection}</p>
          </div>

          <BookActions
            book={book}
            onUpdateBook={setBook}
            onSaveRating={setBook}
          />
        </div>
      </div>
      <div className="single-book__bottom-section">
        <div className="single-book__stats">
          <div className="stat">
            <FontAwesomeIcon icon={faBook} size="2x" />
            <div>
              <p className="stat__value">{book.pages_read}</p>
              <p className="stat__label">Pages read</p>
            </div>
          </div>

          <div className="stat">
            <FontAwesomeIcon icon={faClock} size="2x" />
            <div>
              <p className="stat__value">
                {book.readingLogs?.[0]?.minutes_read || 0}
              </p>
              <p className="stat__label">Minutes read</p>
            </div>
          </div>
        </div>
        <div className="single-book__review">
          <div className="single-book__title-box">
            <h2>Review</h2>
            <FontAwesomeIcon icon={faCommentDots} size="2x" />
          </div>
          <p>{book.review || "No review yet."}</p>
        </div>
        <div className="single-book__rating">
          <div className="single-book__title-box">
            <h2>Rating</h2>
            <FontAwesomeIcon icon={faRankingStar} size="2x" />
          </div>
          <Rating rating={book.rating || 0} />
        </div>
        <div className="single-book__characters">
          <div className="single-book__title-box">
            <h2>Characters</h2>
            <FontAwesomeIcon icon={faChildren} size="2x" />
          </div>
          {book.characters?.length ? (
            <ul>
              {book.characters.map((char, i) => (
                <li key={i}>{char}</li>
              ))}
            </ul>
          ) : (
            <p>No characters added.</p>
          )}
        </div>
        <div className="single-book__delete">
          <Button
            text="Delete book"
            className="del-btn"
            // onClick={() => handleDeleteBook(book.id)}
            onClick={() => setShowConfirm(true)} 
          />
        </div>
        <ConfirmModal
        isOpen={showConfirm}
        message="Are you sure you want to delete this book?"
        onConfirm={() => {
          handleDeleteBook(book.id);
          setShowConfirm(false);
        }}
        onCancel={() => setShowConfirm(false)}
      />
      </div>
    </div>
  );
}
