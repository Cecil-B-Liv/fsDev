import { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import "../styles/profileCardComponent.css";

export default function MemberManageCard({ username, location, imageSrc }) {
  const [status, setStatus] = useState(null);

  const handleProfile = () => {
    // Logic to view the member's profile
    console.log(`Viewing profile of ${username}`);
  };

  const handleKick = () => {
    // Logic to kick the member out of the group
    setStatus("kicked");
    console.log(`${username} has been kicked out of the group.`);
  };

  return (
    <div className="card-container">
      <Card className="profile-card bg-light">
        <Card.Body className="d-flex align-items-center">
          <Image src={imageSrc} roundedCircle width={50} height={50} />
          <div className="profile-info ms-3">
            <Card.Title as="h5" className="mb-1">
              {username}
            </Card.Title>
            <Card.Text className="text-muted mb-0">{location}</Card.Text>
          </div>
          <div className="profile-actions ms-auto">
            <Button variant="primary" onClick={handleProfile}>
              Profile
            </Button>
            <Button
              variant="danger"
              onClick={handleKick}
              disabled={status === "kicked"}
            >
              Kick
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
