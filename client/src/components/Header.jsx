import { Link } from "react-router-dom";

export default function Header() {

  return (
    <header className="header">
      <div className="header__container"><Link to="/profile">Profile</Link> | <Link to="/change-password">ChangePassword</Link> | <Link to="/login">Login</Link> | <Link to="/register">Register</Link></div>
    </header>
  );
}