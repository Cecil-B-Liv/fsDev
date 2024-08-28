import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginSignupPage from "./pages/LoginSignupPage";
import HomePage from "./pages/Homepage";
import Feed from "./components/feedComponent";
import NotFound from "./pages/NotFound";
import UserGroupsComponent from "./components/userGroupsComponent";
import FriendList from "./components/friendListComponent";
import CreateGroupComponent from "./components/createGroupComponent";
import GroupWall from "./components/groupWallComponent";

// Data test add by NA
const groups = [
  {
    groupId: 1,
    groupName: "Group 1",
    groupDescription: "Demo Group, This group link is active",
  },
  {
    groupId: 2,
    groupName: "Group 2",
    groupDescription: "Description 2",
  },
  {
    groupId: 3,
    groupName: "Group 1",
    groupDescription: "Description 1",
  },
  {
    groupId: 4,
    groupName: "Group 2",
    groupDescription: "Description 2",
  },
  {
    groupId: 5,
    groupName: "Group 1",
    groupDescription: "Description 1",
  },
  {
    groupId: 6,
    groupName: "Group 2",
    groupDescription: "Description 2",
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginSignupPage />,
    errorElement: <NotFound />,
  },
  {
    path: "/HomePage",
    element: <HomePage />,
    children: [
      {
        index: true,
        element: <Feed />,
      },
      {
        path: "Groups",
        element: <UserGroupsComponent groups={groups} />,
      },
      {
        path :"Group",
        element: <GroupWall/>,
        children: [
          {
            path: "GroupFeeds",
            element: <Feed/>,
          },
          {
            path: "GroupMemebers",
            element: <FriendList/>
          }
        ]
      },
      {
        path: "Friends",
        element: <FriendList />,
      },
      {
        path: "CreateGroup",
        element: <CreateGroupComponent />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
