import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();
  // const { showAlert } = useAlert();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      console.log(err);
      
      // showAlert("error", err.message);
    }
  };
  return (
    <div className="login">
      <div className="login__box">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Password
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="toggle-password"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </div>
          </label>
          <button type="submit">Sign In</button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
