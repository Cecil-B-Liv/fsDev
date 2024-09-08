import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { logout as logoutAction } from "../redux/feature/authSlice";

import NotificationComponent from './notificationComponent';
import { checkAuth, logout } from "../apis/auth";

import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavDropdown from 'react-bootstrap/NavDropdown';

import '../styles/headerComponent.css';

export default function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [prevScrollpos, setPrecScrollpos] = useState(window.scrollY);
    const [top, setTop] = useState(0);
    const [showNotifications, setShowNotifications] = useState(false);
    const [currentUser, setCurrentUser] = useState("");

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

    const handleLogout = async () => {
        await logout();

        // Dispatch the logout action to clear the Redux store
        // dispatch(logoutAction());

        navigate("/login");
    };

    useEffect(() => {
        const user = async () => {
            const response = await checkAuth();
            setCurrentUser(response);
        };

        user();
    }, []);


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
                    <Navbar.Brand href="/">
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
                            onClick={() => setShowNotifications(!showNotifications)}
                        >
                            <i className="bi bi-bell-fill"></i>
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
                            title={`${currentUser.username}`}
                            id="basic-nav-dropdown"
                            align='end'
                        >
                            <NavDropdown.Item href="/profile">
                                <i className="bi bi-person-circle"></i> Your Page
                            </NavDropdown.Item>

                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={handleLogout}>
                                <i className="bi bi-box-arrow-right"></i>
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar>
                <div id='headerDivider'></div>
            </Container >
        </>
    );
}
