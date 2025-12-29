import { useState, useEffect } from "react";
import {
  getAllBooks,
  updateBook as updateBookRating,
  deleteBook,
  toggleFavouriteBook,
} from "../api/booksApi";
import ConfirmModal from "../components/ConfirmModal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faXmark,
  faHeart as faHeartSolid,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import {
  // faCircleXmark as faCircleXmarkReg,
  faHeart as faHeartReg,
} from "@fortawesome/free-regular-svg-icons";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import BookActions from "../components/BookActions";
import ProgressBar from "../components/ProgressBar";
import Button from "../components/Button";
// import BookCard from "../components/BookCard";
import { Link } from "react-router-dom";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeBook = books[activeIndex];
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [onlyFavourites, setOnlyFavourites] = useState(false);
  const [confirmBookId, setConfirmBookId] = useState(null);

  const updateBook = async (updatedBook) => {
    setBooks((prev) =>
      prev.map((b) => (b.id === updatedBook.id ? updatedBook : b))
    );
    const { id, rating, reading_status, pages_read } = updatedBook;
    try {
      await updateBookRating(id, { rating, reading_status, pages_read });
    } catch (err) {
      console.error("Failed to update book on server", err);
    }
  };

  const progress =
    activeBook && activeBook.pages_total
      ? Math.round((activeBook.pages_read / activeBook.pages_total) * 100)
      : 0;

  // console.log(books);
  const statusMap = {
    will: "Not started yet",
    now: "Currently reading",
    done: "Book finished",
  };

  const filteredAndSortedBooks = books
    .filter((book) => {
      const query = search.toLowerCase();
      return (
        book.title.toLowerCase().includes(query) ||
        book.author?.toLowerCase().includes(query) ||
        book.genre?.toLowerCase().includes(query)
      );
    })
    .filter((book) =>
      statusFilter ? book.reading_status === statusFilter : true
    )
    .filter((book) => (onlyFavourites ? book.is_favourite === true : true))
    .sort((a, b) => {
      switch (sort) {
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        case "pages-asc":
          return a.pages_total - b.pages_total;
        case "pages-desc":
          return b.pages_total - a.pages_total;
        case "rating-asc":
          return (a.rating || 0) - (b.rating || 0);

        case "rating-desc":
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });

  const saveRating = async (bookId, rating) => {
    try {
      await updateBookRating(bookId, { rating });
      setBooks((prevBooks) =>
        prevBooks.map((b) => (b.id === bookId ? { ...b, rating } : b))
      );
    } catch (err) {
      console.error("Failed to save rating", err);
    }
  };

  async function handleToggleFavourite(id) {
    setBooks((prev) =>
      prev.map((book) =>
        book.id === id ? { ...book, is_favourite: !book.is_favourite } : book
      )
    );
    try {
      await toggleFavouriteBook(id);
    } catch (err) {
      setBooks((prev) =>
        prev.map((book) =>
          book.id === id ? { ...book, is_favourite: !book.is_favourite } : book
        )
      );
      alert("Failed to update favourite", err);
    }
  }

  async function handleDeleteBook(id) {
    // const confirmed = window.confirm(
    //   "Are you sure you want to delete this book?"
    // );
    // if (!confirmed) return;

    try {
      await deleteBook(id);

      setBooks((prev) => prev.filter((book) => book.id !== id));
    } catch (err) {
      alert(err.message);
    }
  }

  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await getAllBooks();
        setBooks(res.data.books);
        // console.log(books.data);
      } catch (err) {
        console.error("Failed to load books:", err);
      }
    }

    fetchBooks();
  }, []);

  return (
    <div className="home">
      <div className="home__section-top">
        {books.length > 0 && (
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={2.4}
            initialSlide={0}
            // speed={1000}
            parallax={true}
            loop={true}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            coverflowEffect={{
              rotate: -5,
              stretch: 100,
              depth: 100,
              modifier: 1,
              // slideShadows: true,
            }}
            // autoplay={{ delay: 3500, disableOnInteraction: false }}
            pagination={true}
            modules={[EffectCoverflow, Pagination]}
            className="mySwiper"
          >
            {books.map((book) => (
              <SwiperSlide key={book.id}>
                <img
                  src={book.image_url || "/images/no_cover_available.png"}
                  alt={book.title}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        <div className="home__books">
          {books[activeIndex] && (
            <div className="home__content book" key={books[activeIndex].id}>
              <div className="book__status status">
                <span className="status__title">
                  {statusMap[books[activeIndex].reading_status] ||
                    "Unknown status"}
                </span>
                <span className="status__pages">
                  <ProgressBar value={progress}>
                    {books[activeIndex].pages_read}/
                    {books[activeIndex].pages_total}
                  </ProgressBar>
                </span>
              </div>
              <div className="book__info">
                <Button
                  text={books[activeIndex].title}
                  to={`/single-book/${books[activeIndex].id}`}
                  className="book__title"
                />
                <p className="book__author">by {books[activeIndex].author}</p>
                <p className="book__genre">{books[activeIndex].genre}</p>
                <p className="book__collection">
                  {books[activeIndex].collection}
                </p>
              </div>
              <BookActions
                className="book__actions actions"
                book={books[activeIndex]}
                onUpdateBook={updateBook}
                onSaveRating={saveRating}
              />
            </div>
          )}
        </div>
      </div>
      <div className="home__section-bottom">
        <div className="home__inputs-block">
          <div className="home__search">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {!search && (
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="home__search-icon"
              />
            )}
          </div>
          <div className="home__sort">
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="">Sort</option>
              <option value="title-asc">Title A–Z</option>
              <option value="title-desc">Title Z–A</option>
              <option value="pages-asc">Pages ↑</option>
              <option value="pages-desc">Pages ↓</option>
              <option value="rating-desc">Rating ★ → ☆</option>
              <option value="rating-asc">Rating ☆ → ★</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All statuses</option>
              <option value="will">Will read</option>
              <option value="now">Reading now</option>
              <option value="done">Finished</option>
            </select>
            <label className="custom-checkbox">
              <input
                type="checkbox"
                checked={onlyFavourites}
                onChange={(e) => setOnlyFavourites(e.target.checked)}
              />
              <span className="checkmark"></span>
              Favourites
            </label>
          </div>
        </div>
        <div className="home__books-list book">
          {filteredAndSortedBooks?.length === 0 && <p>No books found!</p>}
          {filteredAndSortedBooks?.map((book) => (
            <div key={book.id} className="book__item">
              <Link to={`/single-book/${book.id}`}>
                <div className="book__content">
                  <div className="book__icon">
                    <FontAwesomeIcon icon={faBook} size="2x" />
                  </div>
                  <div className="book__text">
                    <p className="book__title">{book.title}</p>
                    <p>
                      by <span className="book__author">{book.author}</span>
                    </p>
                  </div>
                </div>
              </Link>
              <div className="book__actions">
                <FontAwesomeIcon
                  className={`book__heart ${book.is_favourite ? "active" : ""}`}
                  icon={book.is_favourite ? faHeartSolid : faHeartReg}
                  size="2x"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleToggleFavourite(book.id);
                  }}
                />
                <FontAwesomeIcon
                  icon={faXmark}
                  size="2x"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // handleDeleteBook(book.id);
                    setConfirmBookId(book.id);
                  }}
                />
              </div>
              <ConfirmModal
                isOpen={confirmBookId === book.id}
                message="Are you sure you want to delete this book?"
                onConfirm={async () => {
                  await handleDeleteBook(book.id);
                  setConfirmBookId(null);
                }}
                onCancel={() => setConfirmBookId(null)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
