import { useState } from "react";
import { Badge, Card, Button, Image} from "react-bootstrap";
import { acceptFriendRequest, denyFriendRequest } from "../apis/users";

function FriendRequestNotification({ notification }) {
  const [status, setStatus] = useState(null);
  const assets = import.meta.env.VITE_SERVER_ASSETS;

  const handleAccept = async () => {
    try {
      const response = await acceptFriendRequest(notification._id);
      if (response) {
        setStatus("accepted");
      }
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };

  const handleDecline = async () => {
    try {
      const response = await denyFriendRequest(notification._id);
      if (response) {
        setStatus("declined");
      }
    } catch (error) {
      console.error("Error declining friend request:", error);
    }
  };

  const sender = notification.senderId; 

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
          src={`${assets}${sender.picturePath}` || "https://via.placeholder.com/50"}
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
          style={{ marginLeft: "80px", display: "flex", alignItems: "center" }}
        >
          <div>
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
                <Button variant="danger" size="sm" onClick={handleDecline}>
                  Decline
                </Button>
              </div>
            ) : (
              <p className="text-muted">
                {status === "accepted"
                  ? "Request accepted"
                  : "Request declined"}
              </p>
            )}
          </div>
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

export default FriendRequestNotification;
