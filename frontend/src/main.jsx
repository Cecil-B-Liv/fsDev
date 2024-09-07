import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import LoginSignupPage from "./pages/LoginSignUpPage";
import HomePage from "./pages/Homepage";
import Feed from "./components/feedComponent";
import NotFound from "./pages/NotFound";
import UserGroupsComponent from "./components/userGroupsComponent";
import FriendList from "./components/friendListComponent";
import CreateGroupComponent from "./components/createGroupComponent";
import GroupWall from "./components/groupWallComponent";
import FriendRequest from "./components/friendRequestCardComponent";
import SiteAdmin from "./pages/SiteAdminpage";
import GroupCreateRequestList from "./components/groupCreateRequestList";
import GroupAdminPage from "./pages/GroupAdminPage";
import JoinRequestList from "./components/joinRequestList";
import MemberManageList from "./components/memberManageList";
import Profile from "./components/ProfileComponent"
import ManageUsersList from "./components/manageUserList";
import SiteAdminDashBoard from "./components/siteAdminDashboard";

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
    // used to protect the homepage when isnt logged in
    // element: (
    //   <ProtectedRoute>  {/* Wrap the protected HomePage route */}
    //     <HomePage />
    //   </ProtectedRoute>
    // ),
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
        path: "Profile",
        element: <Profile/>,
      },
      {
        path: "Groups/:GroupID",

        element: <GroupWall />,
        children: [
          {
            index: true,
            element: <Feed/>
          },
          {
            path: "GroupFeeds",
            element: <Feed />,
          },
          {
            path: "GroupMembers",
            element: <FriendList />,
          }
        ],
      },
      {
        path: "Friends",
        element: <FriendList />,
      },
      {
        path: "CreateGroup",
        element: <CreateGroupComponent />,
      },
      {
        path: "FriendRequests",
        element: <FriendRequest/>,
      },
      {
        path: "SiteAdminDashboard",
        element: <SiteAdminDashBoard/> 
      }
    ],
  },
  {
    path: "/HomePage/Groups/:GroupID/ManageGroup",
    element: <GroupAdminPage/>,
    children: [
      {
        index:true,
        element: <JoinRequestList/>
      },
      {
        path: "JoinRequests",
        element: <JoinRequestList/>
      },
      {
        path:"Members",
        element: <MemberManageList/>
      }
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
