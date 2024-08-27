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
      <Row style={{ backgroundColor: "lightblue" }}>
        <HeaderComponent />
      </Row>
      <Row>
        <Col xs={3} style={{ backgroundColor: "lightgreen" }}>
          <SideNavComponent />
        </Col>
        <Col xs={9} style={{ backgroundColor: "lightyellow" }}>
          <Row>
            <Col style={{ backgroundColor: "lightcoral" }}>
              <Outlet />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
