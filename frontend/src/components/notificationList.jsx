import { Card } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";

import GroupCreationApproval from "./groupCreationApprovalNotiComponent";
import GroupMemberRequest from "./groupMemberRequestNotiComponent";
import FriendRequestNotification from "./friendReqNotiComponent";
import GeneralNotiComponent from "./generalNotiComponent";

export default function NotificationList() {
  const notifications = [
    {
      id: 1,
      senderId: {
        picturePath: "https://via.placeholder.com/50",
      },
      time: "3 hours",
      notiType: "friendRequest",
      notiDescription: "Sam Guy has sent you a friend request.",
      isNew: true,
    },
    {
      id: 2,
      senderId: {
        picturePath: "https://via.placeholder.com/50",
      },
      time: "3 hours",
      notiType: "general",
      notiDescription: "Hikaru Subaru and 13 others reacted to your video.",
      isNew: false,
    },
    {
      id: 3,
      senderId: {
        picturePath: "https://via.placeholder.com/50",
      },
      time: "2 days",
      notiType: "general",
      notiDescription: "Firefly tagged you in the comment of a post.",
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
      notiDescription: "Dude sent you a group member request.",
      isNew: false,
    },
    {
      id: 5,
      senderId: {
        picturePath: "https://via.placeholder.com/50",
      },
      time: "2 days",
      notiType: "groupCreationApproval",
      notiDescription: "Wattson requested group creation approval.",
      isNew: true,
    },
    {
      id: 6,
      senderId: {
        picturePath: "https://via.placeholder.com/50",
      },
      time: "3 hours",
      notiType: "friendRequest",
      notiDescription: "Sam Guy has sent you a friend request.",
      isNew: true,
    },
  ];

  // Filter notifications based on the type
  const generalNotifications = notifications.filter((noti) => noti.notiType === "general");
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
            
      
          </ListGroup>
        </Card>
      </Card>
    </>
  );
}
