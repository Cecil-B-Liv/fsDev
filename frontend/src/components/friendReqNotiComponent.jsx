import React, { useState } from "react";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { acceptFriendRequest, denyFriendRequest } from "../apis/users"; // Import the API functions

function FriendRequestNotification({ notification }) {
  const [status, setStatus] = useState(null);

  const handleAccept = async () => {
    try {
      const response = await acceptFriendRequest(notification._id); // Call the API function
      if (response) {
        setStatus("accepted");
      }
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };

  const handleDecline = async () => {
    try {
      const response = await denyFriendRequest(notification._id); // Call the API function
      if (response) {
        setStatus("declined");
      }
    } catch (error) {
      console.error("Error declining friend request:", error);
    }
  };

  const sender = notification.senderId;
  const displayName = sender.displayName;
  const picturePath = sender.picturePath;

  return (
    <Card
      className="d-flex align-items-center"
      style={{ minHeight: "150px", backgroundColor: "#FFFFFF" }} // Consistent height
    >
      <Card.Body className="d-flex align-items-center">
        <Image
          src={picturePath}
          alt={displayName}
          roundedCircle
          style={{ width: "50px", height: "50px", marginRight: "15px" }} // Consistent image size
        />
        <div className="flex-grow-1">
          <Card.Title className="mb-1">{displayName}</Card.Title>
          <Card.Text className="text-muted mb-2">
            {notification.time} ago
          </Card.Text>
          {status === null ? (
            <div>
              <Button
                variant="success"
                size="sm"
                onClick={handleAccept}
                className="me-2"
              >
                Accept
              </Button>
              <Button variant="danger" size="sm" onClick={handleDecline}>
                Decline
              </Button>
            </div>
          ) : (
            <p className="text-muted">
              {status === "accepted" ? "Request accepted" : "Request declined"}
            </p>
          )}
        </div>
        {notification.isNew && (
          <Badge bg="primary" pill>
            &nbsp;
          </Badge>
        )}
      </Card.Body>
    </Card>
  );
}

export default FriendRequestNotification;
