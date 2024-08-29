import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../styles/sideNavComponent.css";
import { Button } from "react-bootstrap";

export default function SideNav() {
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
            <Button>
              <Nav.Link href="#discovery">🔍 Discovery</Nav.Link>
            </Button>
            <Button>
              <Nav.Link href="/HomePage/CreateGroup">➕ Create new group</Nav.Link>
            </Button>
            <Button>
              <Nav.Link href="Login">➕ Sign Out</Nav.Link>
            </Button>
          </div>
        </Nav>
      </Navbar>
    </Container>
  );
}
