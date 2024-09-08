import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LoginSignupPage from "./pages/LoginSignUpPage";
import HomePage from "./pages/Homepage";
import Feed from "./components/feedComponent";
import NotFound from "./pages/NotFound";
import UserGroupsComponent from "./components/userGroupsComponent";
import FriendList from "./components/friendListComponent";
import CreateGroupComponent from "./components/createGroupComponent";
import GroupWall from "./components/groupWallComponent";
import NotificationList from "./components/notificationList";
import GroupAdminPage from "./pages/GroupAdminPage";
import JoinRequestList from "./components/joinRequestList";
import MemberManageList from "./components/memberManageList";
import YourProfile from "./components/ProfileComponent";
import SiteAdminDashBoard from "./components/siteAdminDashboard";
import ProtectedRoute from "./Utils/ProtectedRoutes";
import GroupMange from "./components/groupManage";
import SearchResults from "./components/searchResult";
import OtherProfileComponent from "./components/otherProfileComponent";

import "./index.css";

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
    path: "/login",
    element: <LoginSignupPage />,
    errorElement: <NotFound />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        children: [
          {
            index: true,
            element: <Feed />,
          },
          {
            path: "groups",
            element: <UserGroupsComponent groups={groups} />,
          },
          {
            path: "yourprofile",
            element: <YourProfile />,
          },
          { 
            path: "profile/:userId", 
            element: <OtherProfileComponent/>
          },
          {
            path: "groups/:groupID",

            element: <GroupWall />,
            children: [
              {
                index: true,
                element: <Feed />,
              },
              {
                path: "groupfeeds",
                element: <Feed />,
              },
              {
                path: "groupmembers",
                element: <FriendList />,
              },
              {
                path: "groupmanage",
                element: <GroupMange />,
              },
            ],
          },
          {
            path: "friends",
            element: <FriendList />,
          },
          {
            path: "creategroup",
            element: <CreateGroupComponent />,
          },
          {
            path: "notifications",
            element: <NotificationList />,
          },
          {
            path: "siteadmindashboard",
            element: <SiteAdminDashBoard />,
          },
          {
            path: "searchresults",
            element: <SearchResults />,
          },
        ],
      },

      // TESTING
      // {
      //   path: "/HomePage/Groups/:GroupID/ManageGroup",
      //   element: <GroupAdminPage />,
      //   children: [
      //     {
      //       index: true,
      //       element: <JoinRequestList />
      //     },
      //     {
      //       path: "JoinRequests",
      //       element: <JoinRequestList />
      //     },
      //     {
      //       path: "Members",
      //       element: <MemberManageList />
      //     }
      //   ]
      // }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
