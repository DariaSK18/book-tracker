import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/Button";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
    console.error("Logout error", err);
  }
  };

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/">Bookich</Link>

        {user ? (
          <>
            <Link to="/profile">
              <FontAwesomeIcon icon={faUser} />
              Profile
            </Link>{" "}
            |{" "}
            <Button
              text={"Logout"}
              onClick={handleLogout}
              className="header-logout-btn"
            ></Button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link> |{" "}
            <Link to="/register">Register</Link>
          </>
        )}

        {/* <Link to="/profile">Profile</Link> |{" "}
        <Link to="/change-password">ChangePassword</Link> |{" "}
        <Link to="/login">Login</Link> | <Link to="/register">Register</Link> */}
        {/* <Link to="/upload-book">Upload Book</Link> */}
      </div>
    </header>
  );
}
