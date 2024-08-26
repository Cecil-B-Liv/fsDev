import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import HeaderComponent from "../components/headerComponent";
import SideNavComponent from "../components/sideNavComponent";
import UserPostComponent from "../components/userPostComponent";
import CreatePostHeaderComponent from "../components/createPostHeaderComponent";
import CommentsList from "../components/commentsListComponent"
import CreateGroup from "../components/createGroupComponent"
import FriendList from "../components/friendListComponent"
import FriendRequest from "../components/friendRequestCardComponent"
// import ProfileCard from "../components/profileCard";
// import FriendRequestCard from "../components/FriendRequestCard";

export default function HomePage() {
  return (
    <>
      <HeaderComponent />
      <SideNavComponent />
      <Row>
        <Col>
          <CreatePostHeaderComponent />
          <UserPostComponent />
          <UserPostComponent />
          <UserPostComponent />
          <CommentsList/>
          <CreateGroup/>
          <FriendList/>
          <FriendRequest/>
        </Col>
      </Row>
    </>
  );
}
