import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import GroupCreationApproval from "./groupCreationApprovalNotiComponent";
import GroupMemberRequest from "./groupMemberRequestNotiComponent";
import FriendRequestNotification from "./friendReqNotiComponent";
import GeneralNotiComponent from "./generalNotiComponent";

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

const renderNotification = (notification) => {
  switch (notification.notiType) {
    case "friendRequest":
      return <FriendRequestNotification notification={notification} />;
    case "groupCreationApproval":
      return <GroupCreationApproval notification={notification} />;
    case "groupMemberRequest":
      return <GroupMemberRequest notification={notification} />;
    case "general":
      return <GeneralNotiComponent notification={notification} />;
  }
};

const NotificationComponent = () => {
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
