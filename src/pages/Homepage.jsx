import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
0;

import HeaderComponent from "../components/headerComponent";
import SideNavComponent from "../components/sideNavComponent";
import UserPostComponent from "../components/userPostComponent";
import CreatePostHeaderComponent from "../components/createPostHeaderComponent";
import ProfileCard from "../components/profileCard";
import FriendRequestCard from "../components/FriendRequestCard";

export default function HomePage() {
  return (
    <>
      <HeaderComponent />
      <SideNavComponent />
      <Row>
        <Col>
          {/* For Testing */}
          <FriendRequestCard/>
          
        </Col>
      </Row>
    </>
  );
}
