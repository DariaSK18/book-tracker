import { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";

export default function Auth() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="auth">
      <div className="auth__tabs">
        <div id="btn" className={activeTab}></div>
        <button
          className="auth__tab"
          onClick={() => setActiveTab("login")}
        >
          Login
        </button>
        <button
          className="auth__tab"
          onClick={() => setActiveTab("register")}
        >
          Register
        </button>
      </div>

      <div className="auth__form">
        {activeTab === "login" && <Login />}
        {activeTab === "register" && <Register />}
      </div>
    </div>
  );
}
