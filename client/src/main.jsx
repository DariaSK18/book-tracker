import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import './index.css'
import { AuthProvider } from "./context/AuthContext.jsx";
import App from "./App.jsx";
import './styles/styles.scss';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
