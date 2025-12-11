import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container"><Link to="/">My Books</Link> | <Link to="/goals">Goals</Link> | <Link to="/statistic">Stats</Link> | <Link to="/categories">Categories</Link> | <Link to="/collections">Collections</Link></div>
    </footer>
  );
}
