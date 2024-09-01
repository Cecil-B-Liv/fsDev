import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Outlet } from "react-router-dom";
import HeaderComponent from "../components/headerComponent";
import SideNavComponent from "../components/sideNavComponent";
import "../styles/sideNavComponent.css";
import "../styles/HomePage.css";

export default function HomePage() {
  const isGroupOwner = true; // for testing purpose only 
  return (
    <>
      <Row>
        <HeaderComponent />
      </Row>

      <Row className="flex-row">
        <Col xs={3} className="sideNav-container">
          <SideNavComponent isGroupOwner={isGroupOwner}/>
        </Col>

        <Col xs={9} className="main-content">
          <Outlet />
        </Col>
      </Row>
    </>
  );
}
