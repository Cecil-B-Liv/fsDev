import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../styles/sideNavComponent.css";
import { Button } from "react-bootstrap";

export default function GroupAdminSideNaV() { //{groupID}
    const groupID = "GroupID";
    return (
        <Container>
        <Navbar expand="lg" className="my-3">
            <Nav className="sideNav flex-column">
                <div className="button-container">
                    <Button>
                    <Nav.Link href={`/HomePage/Groups/${groupID}/ManageGroup/JoinRequests`}>📰 Join Requests</Nav.Link>
                    </Button>
                    <Button>
                    <Nav.Link href={`/HomePage/Groups/${groupID}/ManageGroup/PostRequests`}>🙂 Post Requests</Nav.Link>
                    </Button>
                    <Button>
                    <Nav.Link href={`/HomePage/Groups/${groupID}/ManageGroup/Members`}>🙂 Members</Nav.Link>
                    </Button>
                    <Button>
                    <Nav.Link href={`/HomePage/Groups/${groupID}`}>🙂 Back</Nav.Link>
                    </Button>
                </div>
            </Nav>
        </Navbar>
        </Container>
    );
}
