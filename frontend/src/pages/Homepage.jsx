import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Outlet } from "react-router-dom";

import HeaderComponent from "../components/headerComponent";
import SideNavComponent from "../components/sideNavComponent";
// import ProfileCard from "../components/profileCard";
// import FriendRequestCard from "../components/FriendRequestCard";

export default function HomePage() {
  return (
    <>
      <HeaderComponent />
      <SideNavComponent />
      <Row>
        <Col>
          <Outlet/>
        </Col>
      </Row>
    </>
  );
}
