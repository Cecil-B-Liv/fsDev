import { useState, useEffect } from "react";
import { Container, Card, Row, Col, Button, Form } from "react-bootstrap";
import { getUser } from "../apis/users"; // Function to get user data
import { checkAuth } from "../apis/auth.js"; // Function to check current user authentication
import { getUserPosts } from "../apis/posts"; // Function to get user posts
import { updateUserProfile } from "../apis/users"; // Function to update user profile

import UserPostComponent from "../components/userPostComponent";

const ProfileComponent = () => {
  const assets = import.meta.env.VITE_SERVER_ASSETS; // Path for profile picture

  const [userId, setuserId] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState({});
  const [posts, setPosts] = useState([]);
  const [tempProfile, setTempProfile] = useState(profile);

  // Toggle editing mode for profile
  const handleEditProfile = () => {
    setIsEditing(true);
  };

  // Save profile and call API
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      // Call updateUserProfile API with tempProfile data
      const updatedProfile = await updateUserProfile(tempProfile);
      setProfile(updatedProfile); // Update state with new profile data
      setIsEditing(false); // Turn off editing mode
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(
        error.message || "An error occurred while updating the profile."
      );
    }
  };

  // Cancel profile editing
  const handleCancelEdit = () => {
    setTempProfile(profile);
    setIsEditing(false);
  };

  // Update form inputs in state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempProfile({ ...tempProfile, [name]: value });
  };

  // Fetch current user ID
  useEffect(() => {
    const fetchUser = async () => {
      const response = await checkAuth();
      const currentUser = response;
      setuserId(currentUser.userId);
    };
    fetchUser();
  }, []);

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUser(userId);
        setProfile(response);
        setTempProfile(response); // Sync tempProfile with profile
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchUserProfile();
    }
  }, [userId]);

  // Fetch user posts
  useEffect(() => {
    const fetchUserPost = async () => {
      try {
        const response = await getUserPosts(userId);
        setPosts(response);
      } catch (error) {
        console.error("Error fetching user posts:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchUserPost();
    }
  }, [userId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="mt-4">
      <Card bg="dark" text="white" className="mb-4">
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
                      name="username"
                      value={tempProfile.username || ""}
                      onChange={handleInputChange}
                      placeholder="Enter your username"
                    />
                  </Form.Group>
                  <Form.Group className="mb-1">
                    <Form.Control
                      type="text"
                      name="displayName"
                      value={tempProfile.displayName || ""}
                      onChange={handleInputChange}
                      placeholder="Enter your display name"
                    />
                  </Form.Group>
                  <Form.Group className="mb-1">
                    <Form.Control
                      type="text"
                      name="userBio"
                      value={tempProfile.userBio || ""}
                      onChange={handleInputChange}
                      placeholder="Enter your bio"
                    />
                  </Form.Group>
                  <Form.Group className="mb-1">
                    <Form.Control
                      type="email"
                      name="email"
                      value={tempProfile.email || ""}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                    />
                  </Form.Group>
                  <Form.Group className="mb-1">
                    <Form.Control
                      type="text"
                      name="telephone"
                      value={tempProfile.telephone || ""}
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
                  <p className="mb-1">Name: {profile.displayName}</p>
                  <p className="mb-0">Bio: {profile.userBio}</p>
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
      <>
        {posts && posts.length > 0 ? (
          posts.map((post) => <UserPostComponent key={post._id} post={post} />)
        ) : (
          <p>No posts available</p>
        )}
      </>
    </Container>
  );
};

export default ProfileComponent;
