import { useState } from "react";
import { Container, Card, Row, Col, Button, Form } from "react-bootstrap";
import { useEffect } from "react";

import { getUser } from "../apis/users";
import { checkAuth } from '../apis/auth.js';

import UserPostComponent from "../components/userPostComponent";



const ProfileComponent = () => {
  const assets = import.meta.env.VITE_SERVER_ASSETS;

  const [userId, setuserId] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState({
    name: "Hotaru",
    username: "hotaru123",
    location: "Somewhere in Penacony",
    email: "hotaru@example.com",
    phoneNumber: "123-456-7890",
  });

  const [tempProfile, setTempProfile] = useState(profile);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault(); // Prevent page refresh on form submit
    setProfile(tempProfile);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setTempProfile(profile);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempProfile({ ...tempProfile, [name]: value });
  };

  // Get current user ID
  useEffect(() => {
    const user = async () => {
      const response = await checkAuth();
      const currentUser = response;
      setuserId(currentUser.userId);
    };

    user();
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
          const response = await getUser(userId);

          setProfile(response);
          console.log(response);
      } catch (error) {
          console.error("Error fetching user profile:", error);
          setError(error); // Set error state
      } finally {
          setIsLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchUserProfile();
  }, [userId]);

if (isLoading) {
  return <div>Loading...</div>; // Display loading indicator
}

  return (
    <Container className="mt-4">
      <Card bg="dark" text="white">
        <Card.Body>
          <Row className="align-items-center">
            <Col xs="auto">
              <img
                src={`${assets}${profile.picturePath}`}
                alt="Profile"
                className="rounded-circle"
                style={{ width: "80px", height: "80px", objectFit: "cover" }}
              />
            </Col>
            <Col>
              {isEditing ? (
                <Form onSubmit={handleSaveProfile}>
                  <Form.Group className="mb-1">
                    <Form.Control
                      type="text"
                      name="name"
                      value={tempProfile.name}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                    />
                  </Form.Group>
                  <Form.Group className="mb-1">
                    <Form.Control
                      type="text"
                      name="username"
                      value={tempProfile.username}
                      onChange={handleInputChange}
                      placeholder="Enter your username"
                    />
                  </Form.Group>
                  <Form.Group className="mb-1">
                    <Form.Control
                      type="text"
                      name="location"
                      value={tempProfile.location}
                      onChange={handleInputChange}
                      placeholder="Enter your location"
                    />
                  </Form.Group>
                  <Form.Group className="mb-1">
                    <Form.Control
                      type="email"
                      name="email"
                      value={tempProfile.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                    />
                  </Form.Group>
                  <Form.Group className="mb-1">
                    <Form.Control
                      type="text"
                      name="phoneNumber"
                      value={tempProfile.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                    />
                  </Form.Group>
                  <div className="d-flex justify-content-end mt-3">
                    <Button variant="success" type="submit" className="me-2">
                      Save
                    </Button>
                    <Button variant="secondary" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                  </div>
                </Form>
              ) : (
                <>
                  <p className="mb-1">@{profile.username}</p>
                  <p className="mb-1">Display name: {profile.username}</p>
                  <p className="mb-1">Email: {profile.email}</p>
                  <p className="mb-0">Phone: {profile.telephone}</p>
                </>
              )}
            </Col>
            {!isEditing && (
              <Col xs="auto">
                <Button variant="primary" onClick={handleEditProfile}>
                  Edit Profile
                </Button>
              </Col>
            )}
          </Row>
        </Card.Body>
      </Card>
      <div className="mt-4">
        {/* <UserPostComponent /> */}
      </div>
    </Container>
  );
};

export default ProfileComponent;
