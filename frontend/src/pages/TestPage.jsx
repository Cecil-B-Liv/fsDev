import { useNavigate } from "react-router-dom";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import { Outlet } from "react-router-dom";
// import HeaderComponent from "../components/headerComponent";
// import SideNavComponent from "../components/sideNavComponent";
// import "../styles/sideNavComponent.css";
// import "../styles/HomePage.css";

import { logout } from "../apis/auth";
import { checkAuth } from '../apis/auth.js'; // test
import { useEffect, useState } from 'react';  //test


export default function HomePage() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(""); // test
  // const isGroupOwner = true; // for testing purpose only

  useEffect(() => {
    const user = async () => {
      const response = await checkAuth();
      setCurrentUser(response);
      console.log(response);
    };

    user();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <>
      <div>
        <h1>Protected Page</h1>
        <h2>Hello {currentUser.username} @{currentUser.displayName}</h2>
        <p>userId: {currentUser.userId}</p>
        <h4>Role: {currentUser.userRole}</h4>
        <img src={`http://localhost:3001/assets/${currentUser.picturePath}`} alt={currentUser.displayName} style={{ width: "25%" }} />
        <hr />
        <button onClick={handleLogout}>Logout</button>
      </div>
      {/* <Row>
        <HeaderComponent />
      </Row>

      <Row className="flex-row">
        <Col xs={3} className="sideNav-container">
          <SideNavComponent isGroupOwner={isGroupOwner}/>
        </Col>

        <Col xs={9} className="main-content">
          <Outlet />
        </Col>
      </Row> */}

    </>
  );
}