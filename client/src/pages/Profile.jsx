import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";

export default function Profile() {
  const { user, loading, logout, deleteAccount } = useAuth();
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  // if (!user) return <p>You are not logged in</p>;

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
      <div>{capitilizedName}'s Profile </div>
      <div>Email: {user.email}</div>
      <div><Button to="/change-password" text={"Change Password"} /></div>
      <div>
        <Button
          text={"Logout"}
          onClick={handleLogout}
        />
      </div>
      <div>
        <Button
          text={"Delete account"}
          onClick={handleDelete}
        />
      </div>
    </div>
  );
}
