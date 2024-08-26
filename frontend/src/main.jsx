import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginSignupPage from "./pages/LoginSignupPage";
import HomePage from "./pages/Homepage";
import Feed from "./components/feedComponent";
import NotFound from "./pages/NotFound";
import UserGroupsComponent from "./components/userGroupsComponent";
// import UserGroupPage from "./pages/UserGroupPage";

// Data test add by NA
const groups = [
  { groupId: 1, groupName: 'Group 1', groupDescription: 'Description 1', groupAvatar: 'path/to/avatar1.jpg' },
  { groupId: 2, groupName: 'Group 2', groupDescription: 'Description 2', groupAvatar: 'path/to/avatar2.jpg' },
  { groupId: 3, groupName: 'Group 1', groupDescription: 'Description 1', groupAvatar: 'path/to/avatar1.jpg' },
  { groupId: 4, groupName: 'Group 2', groupDescription: 'Description 2', groupAvatar: 'path/to/avatar2.jpg' },
  { groupId: 5, groupName: 'Group 1', groupDescription: 'Description 1', groupAvatar: 'path/to/avatar1.jpg' },
  { groupId: 6, groupName: 'Group 2', groupDescription: 'Description 2', groupAvatar: 'path/to/avatar2.jpg' },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginSignupPage/>,
    errorElement: <NotFound />,
  },
  {
    path:"/HomePage",
    element: <HomePage/>,
    children: [
      {
        index: true,
        element: <Feed/>
      },
      {
        path: "Groups",
        element : <UserGroupsComponent groups={groups}/>,
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
