import React, { useState } from "react";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { approveGroupRequest, denyGroupRequest } from "../apis/group.js"; 

function GroupMemberRequest({ notification }) {
  const [status, setStatus] = useState(null);

  const handleAccept = async () => {
    try {
      const response = await approveGroupRequest(
        notification.groupId,
        notification._id
      );
      if (response) {
        setStatus("accepted");
      }
    } catch (error) {
      console.error("Error accepting group membership request:", error);
    }
  };

  const handleDeny = async () => {
    try {
      const response = await denyGroupRequest(
        notification.groupId,
        notification._id
      );
      if (response) {
        setStatus("denied");
      }
    } catch (error) {
      console.error("Error denying group membership request:", error);
    }
  };

  return (
    <Card
      className="d-flex align-items-center"
      style={{ minHeight: "150px", backgroundColor: "#FFFFFF" }} // Consistent height
    >
      <Card.Body className="d-flex align-items-center">
        <Image
          src={
            notification.senderId.picturePath ||
            "https://via.placeholder.com/50"
          }
          alt={notification.senderId.displayName}
          roundedCircle
          style={{ width: "50px", height: "50px", marginRight: "15px" }} // Consistent image size
        />
        <div className="flex-grow-1">
          <Card.Title className="mb-1">
            {notification.senderId.displayName}
          </Card.Title>
          <Card.Text className="text-muted mb-2">
            {notification.time} ago
          </Card.Text>
          <Card.Text>
            <strong>Group Member Request:</strong> {notification.notiDescription}
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
              <Button variant="danger" size="sm" onClick={handleDeny}>
                Deny
              </Button>
            </div>
          ) : (
            <p className="text-muted">
              {status === "accepted"
                ? "Group member accepted"
                : "Group member denied"}
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

export default GroupMemberRequest;
