import { createRoot } from "react-dom/client";
import { AuthProvider } from "./Context/AuthContext.jsx";
import App from "./App.jsx";
import "./App.css";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
