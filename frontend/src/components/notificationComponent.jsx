import React from "react";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import GroupCreationApproval from "./groupCreationApprovalNotiComponent"; // Adjust the path as necessary
import GroupMemberRequest from "./groupMemberRequestNotiComponent"; // Adjust the path as necessary
import FriendRequestNotification from "./friendReqNotiComponent"; // Adjust the path as necessary

const notifications = [
  {
    id: 1,
    senderId: {
      displayName: "Sam Guy",
      picturePath: "https://via.placeholder.com/50",
    },
    time: "3 hours",
    notiType: "friendRequest",
    notiDescription: "has sent you a friend request.",
    isNew: true,
  },
  {
    id: 2,
    senderId: {
      displayName: "Hikaru Subaru",
      picturePath: "https://via.placeholder.com/50",
    },
    time: "3 hours",
    notiType: "reaction",
    notiDescription: "and 13 others reacted to your video.",
    isNew: false,
  },
  {
    id: 3,
    senderId: {
      displayName: "Firefly",
      picturePath: "https://via.placeholder.com/50",
    },
    time: "2 days",
    notiType: "comment",
    notiDescription: "tagged you in the comment of a post.",
    isNew: true,
  },
  {
    id: 4,
    senderId: {
      displayName: "Dude",
      picturePath: "https://via.placeholder.com/50",
    },
    time: "2 days",
    notiType: "groupMemberRequest",
    notiDescription: "sent you a group member request.",
    isNew: false,
  },
  {
    id: 5,
    senderId: {
      displayName: "Wattson",
      picturePath: "https://via.placeholder.com/50",
    },
    time: "2 days",
    notiType: "groupCreationApproval",
    notiDescription: "requested group creation approval.",
    isNew: true,
  },
];

// Function to dynamically choose which notification component to render
const renderNotification = (notification) => {
  switch (notification.notiType) {
    case "friendRequest":
      return <FriendRequestNotification notification={notification} />;
    case "groupCreationApproval":
      return <GroupCreationApproval notification={notification} />;
    case "groupMemberRequest":
      return <GroupMemberRequest notification={notification} />;
    default:
      return (
        <ListGroupItem
          key={notification.id}
          className="d-flex justify-content-between align-items-start"
          style={{ display: "flex", alignItems: "center" }} // Dynamic height based on content
        >
          <div className="d-flex">
            <img
              src={notification.senderId.picturePath}
              alt={notification.senderId.displayName}
              className="rounded-circle me-2"
              style={{ width: "50px", height: "50px" }} // Ensure image size consistency
            />
            <div>
              <div style={{ fontSize: "0.9rem" }}>
                <strong>{notification.senderId.displayName}</strong>{" "}
                {notification.notiDescription}
              </div>
              <small className="text-muted">{notification.time}</small>
            </div>
          </div>
          {notification.isNew && (
            <Badge bg="primary" pill>
              &nbsp;
            </Badge>
          )}
        </ListGroupItem>
      );
  }
};

const NotificationComponent = () => {
  return (
    <Card
      style={{
        width: "100%",
        maxHeight: "500px", // Set max height for the container
        backgroundColor: "#f8f9fa",
        overflowY: "auto", // Enable vertical scrolling
      }}
    >
      <Card.Header>Notifications</Card.Header>
      <ListGroup variant="flush">
        {notifications.map((notification) => (
          <div key={notification.id}>
            {renderNotification(notification)}
          </div>
        ))}
      </ListGroup>
    </Card>
  );
};

export default NotificationComponent;
