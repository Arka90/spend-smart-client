import Applayout from "./components/Applayout";
import AuthForm from "./components/AuthForm";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Expense from "./components/Expense";
import Income from "./components/Income";
import News from "./components/News";
import Chat from "./components/Chat";
import CreateChannel from "./components/CreateChannel";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Applayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/expense",
        element: <Expense />,
      },
      {
        path: "/income",
        element: <Income />,
      },
      {
        path: "/news",
        element: <News />,
      },
      {
        path: "/chats",
        element: <Chat />,
      },
      {
        path: "/create-channel",
        element: <CreateChannel />,
      },
    ],
  },
  {
    path: "/signin",
    element: <AuthForm type="signin" />,
  },
  {
    path: "/signup",
    element: <AuthForm type="signup" />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
