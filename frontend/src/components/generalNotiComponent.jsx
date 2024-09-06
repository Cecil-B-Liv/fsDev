import React, { useEffect, useState } from "react";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import { getNotifications } from "../apis/notifications";

function GeneralNotiComponent() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getNotifications();
        setNotifications(data);
      } catch (error) {
        console.error(
          "Error fetching notifications:",
          error.response?.data || error.message
        );
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div>
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <Card
            className="my-3"
            key={notification._id}
            style={{
              width: "100%",
              minHeight: "150px",
              backgroundColor: "#f8f9fa",
            }}
          >
            {" "}
            {/* Ensure same size */}
            <Card.Body className="d-flex align-items-center">
              <Image
                src={
                  notification.senderId.picturePath ||
                  "https://via.placeholder.com/50"
                }
                alt={notification.senderId.displayName}
                roundedCircle
                style={{ width: "50px", height: "50px", marginRight: "15px" }}
              />
              <div className="flex-grow-1">
                <Card.Title className="mb-1">
                  {notification.senderId.displayName}
                </Card.Title>
                <Card.Text className="text-muted mb-2">
                  {notification.time} ago
                </Card.Text>
                <Card.Text>
                  <strong>{getNotiTitle(notification.notiType)}:</strong>{" "}
                  {notification.notiDescription}
                </Card.Text>
              </div>
              {notification.isNew && (
                <Badge bg="primary" pill>
                  &nbsp;
                </Badge>
              )}
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>No notifications available.</p>
      )}
    </div>
  );
}

export default GeneralNotiComponent;
