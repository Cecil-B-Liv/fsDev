import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavDropdown from 'react-bootstrap/NavDropdown';
import NotificationComponent from './NotificationComponent'; 

import '../styles/headerComponent.css';

export default function Header() {
    const [prevScrollpos, setPrecScrollpos] = useState(window.scrollY);
    const [top, setTop] = useState(0);
    const [showNotifications, setShowNotifications] = useState(false); 

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            if (prevScrollpos > currentScrollPos) {
                setTop(0);
            } else {
                setTop(-75);
            }
            setPrecScrollpos(currentScrollPos);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollpos]);

    const headerNavStyle = {
        position: 'fixed',
        top: `${top}px`,
        width: '100%',
        transition: 'top 0.3s',
        transitionTimingFunction: 'ease-in-out',
        backgroundColor: 'white',
    };

    return (
        <>
            <Container fluid>
                <Navbar className="headerNav d-flex justify-content-between p-3" style={headerNavStyle}>
                    <Navbar.Brand href="#home">
                        <img
                            src="/vite.svg"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="RushNet Logo"
                        />
                        RushNet
                    </Navbar.Brand>
                    <Form inline>
                        <Row>
                            <Col xs="auto">
                                <Form.Control
                                    type="text"
                                    placeholder="Search"
                                    className="mr-sm-2"
                                />
                            </Col>
                            <Col xs="auto">
                                <Button type="submit">Search</Button>
                            </Col>
                        </Row>
                    </Form>
                    <Nav className='gap-3'>
                        <Nav.Link
                            href="#notification"
                            onClick={() => setShowNotifications(!showNotifications)} 
                        >
                            🔔
                        </Nav.Link>
                        {showNotifications && (
                            <div
                                style={{
                                    position: 'absolute',
                                    right: '20px',
                                    top: '60px',
                                    zIndex: 1000,
                                    width: '300px', 
                                }}
                            >
                                <NotificationComponent />
                            </div>
                        )}
                        <NavDropdown
                            title="John Doe"
                            id="basic-nav-dropdown"
                            align='end'
                        >
                            <NavDropdown.Item href="#account/3.1">📰 Your Page</NavDropdown.Item>
                            <NavDropdown.Item href="#account/3.2">⚙️ Preference</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#account/3.4">❎ Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar>
                <div id='headerDivider'></div>
            </Container >
        </>
    );
}
