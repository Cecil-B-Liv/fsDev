import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store';

import "./index.css";

// import LoginSignupPage from "./pages/LoginSignupPage";
// import HomePage from "./pages/Homepage";
// import Feed from "./components/feedComponent";
// import NotFound from "./pages/NotFound";
// import UserGroupsComponent from "./components/userGroupsComponent";
// import FriendList from "./components/friendListComponent";
// import CreateGroupComponent from "./components/createGroupComponent";
// import GroupWall from "./components/groupWallComponent";
// import FriendRequest from "./components/friendRequestCardComponent";
// import SiteAdmin from "./pages/SiteAdminpage";
// import GroupCreateRequestList from "./components/groupCreateRequestList";
// import GroupAdminPage from "./pages/GroupAdminPage";
// import JoinRequestList from "./components/joinRequestList";
// import MemberManageList from "./components/memberManageList";
// import Profile from "./components/ProfileComponent"
// import ManageUsersList from "./components/manageUserList";

// REMOVED BY TUNG
// ALREADY SAVED THE OLD CODE. ASK IF NEED

/* ROUTER */
const router = createBrowserRouter([


]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
