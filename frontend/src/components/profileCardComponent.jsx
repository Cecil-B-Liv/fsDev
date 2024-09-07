import { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import "../styles/profileCardComponent.css";

const ProfileCard = ({ username, location, imageSrc, mode }) => {
  const [status, setStatus] = useState(null);

  const handleAccept = () => {
    setStatus("accepted");
  };

  const handleDeny = () => {
    setStatus("denied");
  };

  const handleUnfriend = () => {
    alert(`${username} has been unfriended.`);
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
          <div className="profile-actions ms-auto d-flex">
            {mode === "view" || status === "accepted" ? (
              <>
                <Button variant="primary" className="me-2">
                  Check Profile
                </Button>
                <Button variant="danger" onClick={handleUnfriend}>
                  Unfriend
                </Button>
              </>
            ) : status === "denied" ? (
              <p>Denied</p>
            ) : (
              <>
                <Button variant="primary" className="me-2" onClick={handleAccept}>
                  Accept
                </Button>
                <Button variant="secondary" onClick={handleDeny}>
                  Deny
                </Button>
              </>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProfileCard;
