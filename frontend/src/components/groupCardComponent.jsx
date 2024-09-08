import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const GroupCard = ({ group }) => {
  const assets = import.meta.env.VITE_SERVER_ASSETS;
  return (
    <Card
      className="mb-3 text-center"
      style={{
        width: "18rem",
        height: "20rem",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Card.Img
        variant="top"
        src={`${assets}${group.groupBannerPath}`}
        alt={`${group.name}`}
        className="rounded-circle mx-auto mt-3"
        style={{ width: "80px", height: "80px" }}
      />
      <Card.Body
        style={{
          flex: "1",
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        <div style={{ marginTop: "0.5rem" }}>
          <Card.Title>{group.name}</Card.Title>
        </div>
        <Card.Text
          className="text-muted"
          style={{ fontSize: "0.875rem", textAlign: "center" }}
        >
          {group.description}
        </Card.Text>
      </Card.Body>
      <Card.Footer className="text-center">
        <Link to={`/groups/${group._id}`} className="btn btn-primary">
          Go to Group
        </Link>{" "}
        {/* ${groupId} */}
      </Card.Footer>
    </Card>
  );
};

export default GroupCard;
