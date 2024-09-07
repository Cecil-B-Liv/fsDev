import { useState } from "react";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { approveGroupCreation, denyGroupCreation } from "../apis/group.js";

function GroupCreationApproval({ notification }) {
  const [status, setStatus] = useState(null);

  const handleApprove = async () => {
    try {
      const response = await approveGroupCreation(notification.groupId);
      if (response) {
        setStatus("approved");
      }
    } catch (error) {
      console.error("Error approving group creation:", error);
    }
  };

  const handleDeny = async () => {
    try {
      const response = await denyGroupCreation(notification.groupId);
      if (response) {
        setStatus("denied");
      }
    } catch (error) {
      console.error("Error denying group creation:", error);
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
            notification.senderId.picturePath ||
            "https://via.placeholder.com/50"
          }
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
                onClick={handleApprove}
                className="me-2"
              >
                Approve
              </Button>
              <Button variant="danger" size="sm" onClick={handleDeny}>
                Deny
              </Button>
            </div>
          ) : (
            <p className="text-muted">
              {status === "approved"
                ? "Group creation approved"
                : "Group creation denied"}
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

export default GroupCreationApproval;
