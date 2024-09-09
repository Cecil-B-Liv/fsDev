import { useState, useEffect } from "react";
import { Container, Card, Row, Col, Button, Form } from "react-bootstrap";
import { useParams } from 'react-router-dom';  // Import useParams
import { checkAuth } from "../apis/auth.js";

import { getUser, sendFriendRequest, removeFriend, getUserFriends } from "../apis/users";
import { getUserPosts } from "../apis/posts";


import UserPostComponent from "../components/userPostComponent";

const OtherProfileComponent = () => {
  const assets = import.meta.env.VITE_SERVER_ASSETS;

  const [isLoading, setIsLoading] = useState(true);
  const [isFriend, setIsFriend] = useState(false);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState([]);
  const [posts, setPosts] = useState([]);
  const [currentUserId, setCurrentUserId] = useState("");
  const [userFriends, setUserFriends] = useState([]);

  // Get otherUserID from url
  const { userId } = useParams();  // Get userID from URL params

  const handleAddFriendRequest = async () => {
    const recipientId = userId;
    console.log(recipientId);
    const respond = await sendFriendRequest({ recipientId });
    console.log("Friend request sent");
    alert(respond.msg)
  };

  const handleUnfriendRequest = async () => {
    const friendId = userId;
    const respond = await removeFriend({friendId});
    console.log("Friend removed");
    alert(respond.msg);
  };

  // GET OTHER USER DATA
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUser(userId);
        setProfile(response);
        // setTempProfile(response);
        // console.log(response);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  // GET OTHER USER POST
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

    fetchUserPost();
  }, [profile]);

  // Fetch current authenticated user
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await checkAuth();
        setCurrentUserId(response.userId);  // Set the user after checking authentication
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };
    fetchCurrentUser();
  }, []);

  // check friend relation
  useEffect(() => {
    const handleCheckFriend = async () => {
      try {
        // Fetch other user's friends
        const friends = await getUserFriends(userId);

        // Check if the current user is in the other user's friends list
        const isFriend = friends.some(friend => friend._id.toString() === currentUserId);

        if (isFriend) {
          setIsFriend(true);  // Set state to true if they are friends
        } else {
          setIsFriend(false); // Set state to false if they are not friends
        }

      } catch (error) {
        console.error('Error checking friend status:', error);
      }
    };
    handleCheckFriend()
  }, [currentUserId])

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

            {/* Move the button to the right */}
            {!isFriend && (
              <Col xs="auto" className="ms-auto">
                <Button variant="primary" onClick={handleAddFriendRequest}>
                  Add Friend
                </Button>
              </Col>
            )}

            {isFriend && (
              <Col xs="auto" className="ms-auto">
                <Button variant="danger" onClick={handleUnfriendRequest}>
                  Unfriend
                </Button>
              </Col>
            )}

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
