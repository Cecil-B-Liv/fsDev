import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";
import "../styles/sideNavComponent.css";
import "bootstrap-icons/font/bootstrap-icons.css"; 

export default function SiteAdminSideNav({ isGroupOwner }) {
  return (
    <Container>
      <Navbar expand="lg" className="my-3">
        <Nav className="sideNav flex-column">
          <div className="button-container">
            <Button>
              <Nav.Link href="/SiteAdmin/Feed">
                <i className="bi bi-newspaper"></i> Feed
              </Nav.Link>
            </Button>
            <Button>
              <Nav.Link href="/SiteAdmin/Users">
                <i className="bi bi-tools"></i> Manage Users
              </Nav.Link>
            </Button>
            <Button>
              <Nav.Link href="/SiteAdmin/Requests">
                <i className="bi bi-people-fill"></i> Group Requests
              </Nav.Link>
            </Button>
            <Button>
              <Nav.Link href="/">
                <i className="bi bi-box-arrow-right"></i> Sign Out
              </Nav.Link>
            </Button>
          </div>
        </Nav>
      </Navbar>
    </Container>
  );
}
