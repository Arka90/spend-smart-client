import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UserProvider } from "./context/userContext/userContext.jsx";
import { MonthylDataProvider } from "./context/monthlyDataContext/monthlyDataContext.jsx";
import { NetDataProvider } from "./context/netDataContext/netDataContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <MonthylDataProvider>
        <NetDataProvider>
          <App />
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </NetDataProvider>
      </MonthylDataProvider>
    </UserProvider>
  </React.StrictMode>
);
