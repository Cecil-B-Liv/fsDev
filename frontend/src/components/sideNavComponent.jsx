import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import useAuthorization from "../Utils/Authorization";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

import "../styles/sideNavComponent.css";

export default function SideNav({ isSiteAdmin }) {
  const location = useLocation();
  const [showSiteAdminDashboardButton, setShowSiteAdminDashboardButton] = useState(false);
  const authorizationCheck = useAuthorization(["siteAdmin"]);

  // Path Checking
  // useEffect(() => {
  //   if (isSiteAdmin) {
  //     setShowSiteAdminDashboardButton(true);
  //   } else {
  //     setShowSiteAdminDashboardButton(false);
  //   }
  // }, [location, isSiteAdmin]);

  // useEffect(() => {
  //   if (authorizationCheck == true) {
  //     setShowSiteAdminDashboardButton(true);
  //   } else {
  //     setShowSiteAdminDashboardButton(false);
  //   }
  // }, []);

  return (
    <Container>
      <Navbar expand="lg" className="my-3">
        <Nav className="sideNav flex-column">
          <div className="button-container">
            <Button>
              <Nav.Link href="/">
                <i className="bi bi-newspaper"></i> Feed
              </Nav.Link>
            </Button>
            <Button>
              <Nav.Link href="/friends">
                <i className="bi bi-people"></i> Friends
              </Nav.Link>
            </Button>
            <Button>
              <Nav.Link href="/notifications">
                <i className="bi bi-person-plus"></i> Notifications
              </Nav.Link>
            </Button>
            <Button>
              <Nav.Link href="/groups">
                <i className="bi bi-people-fill"></i> Groups
              </Nav.Link>
            </Button>
            {/* {showSiteAdminDashboardButton && (
              <Button>
                <Nav.Link href={`siteadmindashboard`}>
                  <i className="bi bi-tools"></i> Admin Dashboard
                </Nav.Link>
              </Button>
            )} */}
            {authorizationCheck && (
              <Button>
                <Nav.Link href={`siteadmindashboard`}>
                  <i className="bi bi-tools"></i> Admin Dashboard
                </Nav.Link>
              </Button>
            )}
          </div>
        </Nav>
      </Navbar>
    </Container>
  );
}
