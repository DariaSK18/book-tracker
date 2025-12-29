import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import './index.css'
import { AuthProvider } from "./context/AuthContext.jsx";
import App from "./App.jsx";
import "./styles/styles.scss";
import { AlertProvider } from "./context/AlertContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AlertProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </AlertProvider>
  </StrictMode>
);
