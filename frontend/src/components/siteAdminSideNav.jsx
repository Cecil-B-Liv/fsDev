import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../styles/sideNavComponent.css";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";

export default function SiteAdminSideNav({ isGroupOwner }) {
  return (
    <Container>
      <Navbar expand="lg" className="my-3">
        <Nav className="sideNav flex-column">
          <div className="button-container">
            <Button>
              <Nav.Link href="/SiteAdmin/Feed">📰 Feed</Nav.Link>
            </Button>
            <Button>
              <Nav.Link href="/SiteAdmin/Users">🛠️ Manage User</Nav.Link>
            </Button>
            <Button>
              <Nav.Link href="/SiteAdmin/Requests">🫂 Group Requests</Nav.Link>
            </Button>
            <Button>
              <Nav.Link href="/">➕ Sign Out</Nav.Link>
            </Button>
          </div>
        </Nav>
      </Navbar>
    </Container>
  );
}
