import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import GroupCreationApproval from "./groupCreationApprovalNotiComponent";
import GroupMemberRequest from "./groupMemberRequestNotiComponent";
import FriendRequestNotification from "./friendReqNotiComponent";
import GeneralNotiComponent from "./generalNotiComponent";
import { getNotifications } from "../apis/notifications"; // Import the getNotifications function

const renderNotification = (notification) => {
  switch (notification.notiType) {
    case "friendRequest":
      return <FriendRequestNotification notification={notification} />;
    case "groupCreationApproval":
      return <GroupCreationApproval notification={notification} />;
    case "groupMemberRequest":
      return <GroupMemberRequest notification={notification} />;
    default:
      return <GeneralNotiComponent notification={notification} />;
  }
};

const NotificationComponent = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for API call
  const [error, setError] = useState(null); // Error state

  // Fetch notifications from the API when the component mounts
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getNotifications();
        setNotifications(data); // Set fetched notifications
      } catch (err) {
        console.error("Error fetching notifications:", err);
        setError(err); // Handle error
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchNotifications();
  }, []);

  if (loading) return <div>Loading...</div>; // Show loading indicator
  if (error) return <div>Error: {error}</div>; // Show error message

  return (
    <Card
      style={{
        width: "100%",
        maxHeight: "500px",
        backgroundColor: "#f8f9fa",
        overflowY: "auto",
      }}
    >
      <Card.Header>Notifications</Card.Header>
      <ListGroup variant="flush">
        {notifications.map((notification) => (
          <div key={notification.id}>{renderNotification(notification)}</div>
        ))}
      </ListGroup>
    </Card>
  );
};

export default NotificationComponent;
