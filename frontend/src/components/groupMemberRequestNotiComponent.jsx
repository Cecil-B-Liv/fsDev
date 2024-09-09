import { useState } from "react";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { approveGroupRequest, denyGroupRequest } from "../apis/group.js";

function GroupMemberRequest({ notification }) {
  const [status, setStatus] = useState(null);
  const groupId = notification.senderId;
  const requestId = notification.requestId;

  const sender = notification.senderId;
  const assets = import.meta.env.VITE_SERVER_ASSETS;

  const handleAccept = async () => {
    try {
      const response = await approveGroupRequest(
        groupId,
        requestId
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
        groupId,
        requestId
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
      className="d-flex"
      style={{
        minHeight: "150px",
        backgroundColor: "#FFFFFF",
        position: "relative",
      }}
    >
      <Card.Body className="d-flex align-items-start">
        <Image
          src={
            `${assets}${sender.picturePath}` ||
            "https://via.placeholder.com/50"
          }
          alt={notification.senderId.displayName}
          roundedCircle
          style={{
            width: "50px",
            height: "50px",
            marginRight: "15px",
            position: "absolute",
            top: "10px",
            left: "10px",
          }}
        />
        <div
          style={{
            marginLeft: "80px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Card.Text style={{ marginBottom: "0" }}>
            {notification.notiDescription}
          </Card.Text>
          <Card.Text
            className="text-muted mb-2"
            style={{ fontSize: "0.85rem" }}
          >
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
          <Badge
            bg="primary"
            pill
            className="position-absolute"
            style={{ top: "10px", right: "10px" }}
          >
            &nbsp;
          </Badge>
        )}
      </Card.Body>
    </Card>
  );
}

export default GroupMemberRequest;
