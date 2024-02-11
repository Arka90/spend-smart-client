import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UserProvider } from "./context/userContext/userContext.jsx";
import { MonthylDataProvider } from "./context/monthlyDataContext/monthlyDataContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <MonthylDataProvider>
        <App />
      </MonthylDataProvider>
    </UserProvider>
  </React.StrictMode>
);
