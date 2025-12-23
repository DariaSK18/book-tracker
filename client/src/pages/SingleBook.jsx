import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getBookById } from "../api/booksApi";

import ProgressBar from "../components/ProgressBar";
import BookActions from "../components/BookActions";
import Rating from "../components/Rating";
import Button from "../components/Button";


export default function SingleBook() {
  const { id } = useParams();

  const [book, setBook] = useState(null);

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
  //  console.log(book);

  const statusMap = {
    will: "Not started yet",
    now: "Currently reading",
    done: "Book finished",
  };

  if (!book) return <p>Loading...</p>

  const progress =
    book.pages_total > 0
      ? Math.round((book.pages_read / book.pages_total) * 100)
      : 0;

  return (
        <div className="single-book">
      <div className="home">
        <div className="single-book__cover">
          <img
            src={book.image_url || "/images/no_cover_available.png"}
            style={{width: "180px"}}
            alt={book.title}
          />
        </div>

        <div className="home__books">
          <div className="home__content book">
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
      </div>
      <section className="single-book__stats">
        <div className="stat">
          <i className="fa-solid fa-book-open"></i>
          <div>
            <p className="stat__value">{book.pages_read}</p>
            <p className="stat__label">Pages read</p>
          </div>
        </div>

        <div className="stat">
          <i className="fa-solid fa-clock"></i>
          <div>
            <p className="stat__value">{book.minutes_read || 0}</p>
            <p className="stat__label">Minutes read</p>
          </div>
        </div>
      </section>
      <section className="single-book__review">
        <h2>Review</h2>
        <p>{book.review || "No review yet."}</p>
      </section>
      <section className="single-book__rating">
        <h2>Rating</h2>
        <Rating rating={book.rating || 0} />
      </section>

      <section className="single-book__characters">
        <h2>Characters</h2>
        {book.characters?.length ? (
          <ul>
            {book.characters.map((char, i) => (
              <li key={i}>{char}</li>
            ))}
          </ul>
        ) : (
          <p>No characters added.</p>
        )}
      </section>

      <section className="single-book__danger">
        <Button
          text="Delete book"
          className="danger-btn"
          // onClick={handleDeleteBook}
        />
      </section>
    </div>
  );
}
