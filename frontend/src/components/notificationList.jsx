import { useState, useEffect } from "react";
import { Card, ListGroup } from "react-bootstrap";
import GroupCreationApproval from "./groupCreationApprovalNotiComponent";
import GroupMemberRequest from "./groupMemberRequestNotiComponent";
import FriendRequestNotification from "./friendReqNotiComponent";
import GeneralNotiComponent from "./generalNotiComponent";
import { getNotifications } from "../apis/notifications"; // Import the getNotifications function

export default function NotificationList() {
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

  // Filter notifications based on the type
  const generalNotificationTypes = [
    "friendRequestAccepted",
    "friendRequestDenied",
    "friendRemoved",
    "addedComment",
    "addedReaction",
    "groupCreationApproved",
    "groupCreationDenied",
    "groupMemberAccepted",
    "groupMemberDenied",
    "groupMemberRemoved"
  ];

  const generalNotifications = notifications.filter((noti) =>
    generalNotificationTypes.includes(noti.notiType)
  );
  
  const friendRequests = notifications.filter((noti) => noti.notiType === "friendRequest");
  const groupMemberRequests = notifications.filter((noti) => noti.notiType === "groupMemberRequest");
  const groupCreationRequests = notifications.filter((noti) => noti.notiType === "groupCreationApproval");

  return (
    <>
      {/* General Notification */}
      <Card className="mb-4">
        <Card.Header style={{ textAlign: "center", fontWeight: "bold", fontSize: "1.5rem" }}>
          General Notifications
        </Card.Header>

        <Card
          style={{
            width: "100%",
            maxHeight: "300px", // Set max height for the container
            backgroundColor: "#f8f9fa",
            overflowY: "auto", // Enable vertical scrolling 
          }}
        >
          <ListGroup>
            {generalNotifications.map((noti) => (
              <GeneralNotiComponent key={noti.id} notification={noti} />
            ))}
          </ListGroup>
        </Card>
      </Card>

      {/* Friend Request Notification */}
      <Card className="mb-4">
        <Card.Header style={{ textAlign: "center", fontWeight: "bold", fontSize: "1.5rem" }}>
          Friend Requests
        </Card.Header>

        <Card
          style={{
            width: "100%",
            maxHeight: "300px", // Set max height for the container
            backgroundColor: "#f8f9fa",
            overflowY: "auto", // Enable vertical scrolling 
          }}
        >
          <ListGroup>
            {friendRequests.map((noti) => (
              <FriendRequestNotification key={noti.id} notification={noti} />
            ))}
          </ListGroup>
        </Card>
      </Card>

      {/* Group Member Request Notification */}
      <Card className="mb-4">
        <Card.Header style={{ textAlign: "center", fontWeight: "bold", fontSize: "1.5rem" }}>
          Group Join Requests
        </Card.Header>

        <Card
          style={{
            width: "100%",
            maxHeight: "300px", // Set max height for the container
            backgroundColor: "#f8f9fa",
            overflowY: "auto", // Enable vertical scrolling 
          }}
        >
          <ListGroup>
            {groupMemberRequests.map((noti) => (
              <GroupMemberRequest key={noti.id} notification={noti} />
            ))}
          </ListGroup>
        </Card>
      </Card>

      {/* Group Create Approval Notification */}
      <Card className="mb-4">
        <Card.Header style={{ textAlign: "center", fontWeight: "bold", fontSize: "1.5rem" }}>
          Group Create Requests
        </Card.Header>

        <Card
          style={{
            width: "100%",
            maxHeight: "300px", // Set max height for the container
            backgroundColor: "#f8f9fa",
            overflowY: "auto", // Enable vertical scrolling 
          }}
        >
          <ListGroup>
            {groupCreationRequests.map((noti) => (
              <GroupCreationApproval key={noti.id} notification={noti} />
            ))}
          </ListGroup>
        </Card>
      </Card>
    </>
  );
}
