import { useState, useEffect } from "react";
import { Container, Card, Row, Col, Button, Form } from "react-bootstrap";
import { useParams } from 'react-router-dom';  // Import useParams

import { getUser } from "../apis/users";
import { getUserPosts } from "../apis/posts";


import UserPostComponent from "../components/userPostComponent";

const OtherProfileComponent = () => {
  const assets = import.meta.env.VITE_SERVER_ASSETS;

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState({});
  const [posts, setPosts] = useState([]); // Initialized as an empty array

  

  // Get userID from url
  const { userId } = useParams();  // Get userID from URL params

  // GET USER DATA
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUser(userId);
        setProfile(response);
        setTempProfile(response);
        console.log(response);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  // GET USER POST
  useEffect(() => {
    const fetchUserPost = async () => {
      try {
        const response = await getUserPosts(userId);
        setPosts(response);
        console.log(response);
      } catch (error) {
        console.error("Error fetching user posts:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserPost();
  }, [userId]);

  if (isLoading) {
    return <div>Loading...</div>;
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
            <Col xs="auto"> 
                  <p className="mb-1">@{profile.username}</p>
                  <p className="mb-1">Display name: {profile.displayName}</p>
                  <p className="mb-0">Bio: {profile.userBio}</p>
                  <p className="mb-1">Email: {profile.email}</p>
                  <p className="mb-0">Phone: {profile.telephone}</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <>
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <UserPostComponent key={post._id} post={post} />
          ))
        ) : (
          <p>No posts available</p>
        )}
      </>
    </Container>
  );
};

export default OtherProfileComponent;
