import { useState, useEffect } from 'react';
import { checkAuth } from "../apis/auth.js";
import { getUserFriends } from "../apis/users.js";

import {Card, Container} from 'react-bootstrap';
import ProfileCard from "./profileCardComponent";

import "../styles/friendRequestCardComponent.css";

const FriendList = () => {
  const [currentUser, setCurrentUser] = useState("");
  const [userFriends, setUserFriends] = useState([]);

  useEffect(() => {
    const user = async () => {
      const response = await checkAuth();
      setCurrentUser(response);
    };

    user();

    const userId = currentUser._id;

    const friend = async () => {
      const response = await getUserFriends(userId);
      setUserFriends(response);
    };

    friend();
  }, []);

  // Count user friends number
  const friendNum = userFriends.length;


  // const numFriends = profiles.length;

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
