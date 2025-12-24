import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getBooksByCollection,
  deleteBook,
  toggleFavouriteBook,
} from "../api/booksApi";
import BookCard from "../components/BookCard";
import formatLabel from "../utils/formatLabel";

export default function CollectionBooks() {
  const { slug } = useParams();
  // const collectionName = decodeURIComponent(slug);
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  const formattedLabel = formatLabel(slug);

  // console.log(collectionName, slug, books);

  // const hasFavourite = books.some((b) => b.is_favourite);

  useEffect(() => {
    async function fetchBooks() {
      const res = await getBooksByCollection(slug);
      setBooks(res.data.books);
    }

    fetchBooks();
  }, [slug]);
  async function handleToggleFavourite(id) {
    try {
      const res = await toggleFavouriteBook(id);

      setBooks((prev) =>
        prev.map((book) =>
          book.id === id ? { ...book, is_favourite: res.favourite } : book
        )
      );
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleDeleteBook(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (!confirmed) return;

    try {
      await deleteBook(id);

      setBooks((prev) => prev.filter((book) => book.id !== id));
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="collection-books">
      <h2 className="collection-books__title">Collection: {formattedLabel}</h2>
      {books.length === 0 && <p>No books in this collection</p>}
      <div className="collection-books__wrapper">
        {books.map((book) => (
          <div
            key={book.id}
            onClick={() => navigate(`/single-book/${book.id}`)}
          >
            <BookCard
              data={book}
              onDelete={handleDeleteBook}
              onToggleFavourite={handleToggleFavourite}
            />
            {/* <h4>{book.title}</h4>
            <p>{book.author}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
}
