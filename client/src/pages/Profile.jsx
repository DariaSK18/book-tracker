import { Link } from "react-router-dom";
export default function Profile() {

  return (
    <div className="profile">
      Profile
      <Link to="/change-password">ChangePassword</Link> 
    </div>
  );
}