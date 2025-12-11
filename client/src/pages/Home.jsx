import { useState, useEffect } from "react";
import { getAllBooks } from "../api/booksApi";
export default function Home() {
const [books, setBooks] = useState([])

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
      Home  {books.map(book=>(<p key={book.id}>{book.title}</p>))}
    </div>
  );
}