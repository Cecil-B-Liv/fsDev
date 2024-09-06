import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../styles/sideNavComponent.css";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";

export default function SideNav({ isSiteAdmin }) {
  const groupID = "123" // for testing only
  const location = useLocation();
  const [showSiteAdminDashboardButton, setShowSiteAdminDashboardButton] = useState(false);

  // Path Checking
  useEffect(() => {
    if (isSiteAdmin) {
      setShowSiteAdminDashboardButton(true);
    } else {
      setShowSiteAdminDashboardButton(false);
    }
  }, [location, isSiteAdmin]);

  return (
    <Container>
      <Navbar expand="lg" className="my-3">
        <Nav className="sideNav flex-column">
          <div className="button-container">
            <Button>
              <Nav.Link href="/HomePage/">📰 Feed</Nav.Link>
            </Button>
            <Button>
              <Nav.Link href="/HomePage/Friends">🙂 Friend</Nav.Link>
            </Button>
            <Button>
              <Nav.Link href="/HomePage/FriendRequests">🙂 Friend Requests</Nav.Link>
            </Button>
            <Button>
              <Nav.Link href="/HomePage/Groups">🫂 Group</Nav.Link>
            </Button>
            {showSiteAdminDashboardButton && (
              <Button>
                <Nav.Link href={`/HomePage/SiteAdminDashboard`}>🛠️ Admin Dashboard</Nav.Link>
              </Button>
            )}
          </div>
        </Nav>
      </Navbar>
    </Container>
  );
}
