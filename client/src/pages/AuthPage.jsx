import { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import Button from "../components/Button";

export default function Auth() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="auth">
      <div className="auth__tabs">
        <div id="btn" className={activeTab}></div>
        <Button
        text={'Login'}
          className="auth__tab"
          onClick={() => setActiveTab("login")} />
        <Button
        text={'Register'}
          className="auth__tab"
          onClick={() => setActiveTab("register")} />
      </div>

      <div className="auth__form">
        {activeTab === "login" && <Login />}
        {activeTab === "register" && <Register />}
      </div>
    </div>
  );
}
