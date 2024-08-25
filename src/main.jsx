import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import LoginSignupPage from "./pages/LoginSignupPage";
import HomePage from "./pages/Homepage";
import UserGroupPage from "./pages/UserGroupPage";

const router = createBrowserRouter([
  /* Commented out by Tung for testing */
  // {
  //   path: "/",
  //   element: <LoginSignupPage />,
  // },
  {
    path: "/",
    element: <HomePage />,

  },
  {
    path: "/yourGroups",
    element: <UserGroupPage />,
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
