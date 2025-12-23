import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
import { getAllBooks} from "../api/booksApi";
import { useState, useEffect } from "react";

export default function Profile() {
  const { user, loading, logout, deleteAccount } = useAuth();
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

  const booksAmount = books.length

  useEffect(() => {
      async function fetchBooks() {
        try {
          const res = await getAllBooks();
          setBooks(res.data.books);
        } catch (err) {
          console.error("Failed to load books:", err);
        }
      }
  
      fetchBooks();
    }, []);

  if (loading) return <p>Loading...</p>;

  const capitilizedName =
    user.username[0].toUpperCase() + user.username.slice(1);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.error("Logout error", err);
    }
  };
  const handleDelete = async () => {
    const confirmed = window.confirm(
    "Are you sure? This action cannot be undone."
  );
  if (!confirmed) return;
    try {
      await deleteAccount();
      await logout();
      navigate("/");
    } catch (err) {
      console.error("Logout error", err);
    }
  };

  return (
    <div className="profile">
      <div className="profile__box">
        <div className="profile__info">
          <div className="profile__title">{capitilizedName}'s Profile </div>
          <div><span>Email:</span> {user.email}</div>
          <div><span>Books in library:</span> {booksAmount}</div>
        </div>
        <div className="profile__btns"><Button to="/change-password" text={"Change Password"} 
        className="profile__btn"
        />
          <Button
            text={"Logout"}
            onClick={handleLogout}
            className="profile__btn"
          />
          <Button
            text={"Delete account"}
            onClick={handleDelete}
            className="profile__btn del-btn"
          />
        </div>
      </div>
    </div>
  );
}
