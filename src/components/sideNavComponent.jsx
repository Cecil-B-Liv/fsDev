import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../styles/sideNavComponent.css';

export default function SideNav() {
    return (
        <>
            <Container fluid>
                <Navbar expand="lg" className='my-3'>
                    <Nav className="sideNav flex-column">
                        <Nav.Link href="#home">📰 Feed</Nav.Link>

                        <Nav.Link href="#friends">🙂 Friend</Nav.Link>
                        <Nav.Link href="#groups">🫂 Group</Nav.Link>
                        <Nav.Link href="#new_group">➕ Create new group</Nav.Link>
                    </Nav>
                </Navbar>
            </Container>
        </>
    );
}