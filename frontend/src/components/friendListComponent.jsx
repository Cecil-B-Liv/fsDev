import { useState, useEffect } from 'react';
import { checkAuth } from "../apis/auth.js";
import { getUserFriends } from "../apis/users.js";

import { Card, Container } from 'react-bootstrap';
import ProfileCard from "./profileCardComponent";

import "../styles/friendRequestCardComponent.css";

const FriendList = () => {
  const [currentUser, setCurrentUser] = useState(null); // Initialize with null
  const [userFriends, setUserFriends] = useState([]);

  // First useEffect: Fetch current authenticated user
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await checkAuth();
        setCurrentUser(response);  // Set the user after checking authentication
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    fetchCurrentUser();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Second useEffect: Fetch user friends only after currentUser is set
  useEffect(() => {
    if (!currentUser || !currentUser.userId) return; // Wait until currentUser is populated

    const fetchUserFriends = async () => {
      try {
        const response = await getUserFriends(currentUser.userId);  // Fetch friends using the user ID
        setUserFriends(response);  // Update the userFriends state
      } catch (error) {
        console.error("Error fetching user friends:", error);
      }
    };

    fetchUserFriends();
  }, [currentUser]); // This effect depends on currentUser being set

  // Count user friends number
  const friendNum = userFriends.length;

  return (
    <Container className="marginS">
      <Card className="bg">
        <Card.Header as="h5">Friends List</Card.Header>
        <Card.Body>
          <Card.Title>You have {friendNum} friend(s)</Card.Title>
          {userFriends.map((userFriend) => (
            <ProfileCard
              key={userFriend._id}
              user={userFriend}
              mode="view"
            />
          ))}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default FriendList;
