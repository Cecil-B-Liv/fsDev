import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";

function GeneralNotiComponent({ notification }) {
  const sender = notification.senderId;
  const assets = import.meta.env.VITE_SERVER_ASSETS;

  return (
    <Card
      className="d-flex"
      style={{
        minHeight: "100px",
        backgroundColor: "#FFFFFF",
        position: "relative",
      }}
    >
      <Card.Body className="d-flex align-items-start">
        <Image
          src={`${assets}${sender.picturePath}` || "https://via.placeholder.com/50"}
          alt={sender.displayName}
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

export default GeneralNotiComponent;
