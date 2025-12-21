import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/Button";
import GradientText from "../component/GradientText";

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
        <div className="header__content">
          <div className="header__logo">
            <Link to="/">
              <GradientText
                colors={[
                  "#4089ffff",
                  "#4079ff",
                  "#2fe0ceff",
                  "#4079ff",
                  "#41d5e2ff",
                ]}
                animationSpeed={15}
                showBorder={false}
                className="custom-class"
              >
                Mr. Bookich
              </GradientText>
            </Link>
          </div>

          {user ? (
            <div>
              <Button
                text={<FontAwesomeIcon icon={faUser} />}
                to="/profile"
                className="header__link"
              />
              <Button
                text={"Logout"}
                onClick={handleLogout}
                className="header-logout-btn header__link"
              />
            </div>
          ) : (
            <div>
              <Button text={"Sign In"} to="/auth" className="header__link" />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
