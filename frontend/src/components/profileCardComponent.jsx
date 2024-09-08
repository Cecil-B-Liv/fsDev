import { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import "../styles/profileCardComponent.css";
import { Link } from "react-router-dom";

const ProfileCard = ({ user, mode }) => {
  const assets = import.meta.env.VITE_SERVER_ASSETS;
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
          <Image
            src={`${assets}${user.picturePath}`}
            roundedCircle
            width={50}
            height={50}
          />
          <div className="profile-info ms-3">
            <Card.Title as="h5" className="mb-1">
              {user.username}
            </Card.Title>
          </div>
          <div className="profile-actions ms-auto d-flex">
            {mode === "view" || status === "accepted" ? (
              <>
                <Link to={`/profile/${user._id}`}>
                  <Button variant="primary" className="me-2">
                    Check Profile
                  </Button>
                </Link>
                <Button variant="danger" onClick={handleUnfriend}>
                  Unfriend
                </Button>
              </>
            ) : status === "denied" ? (
              <p>Denied</p>
            ) : (
              <>
                <Button
                  variant="primary"
                  className="me-2"
                  onClick={handleAccept}
                >
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