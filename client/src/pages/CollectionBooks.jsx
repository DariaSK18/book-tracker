import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBooksByCollection } from "../api/booksApi";

export default function CollectionBooks() {
  const { slug } = useParams();
  const collectionName = decodeURIComponent(slug);
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBooks() {
      const res = await getBooksByCollection(collectionName);
      setBooks(res.data.books);
    }

    fetchBooks();
  }, [collectionName]);

  return (
    <div className="collection-books">
      CollectionBooks <br />
      Books from {slug}
      <h2>Books from collection: {slug}</h2>
      {books.length === 0 && <p>No books in this collection</p>}
      {books.map((book) => (
        <div key={book.id} onClick={() => navigate(`/single-book/${book.id}`)}>
          <h4>{book.title}</h4>
          <p>{book.author}</p>
        </div>
      ))}
    </div>
  );
}
