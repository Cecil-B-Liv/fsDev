import { useState } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import "../styles/profileCardComponent.css";

export default function MemberManageCard({member}) {
  const assets = import.meta.env.VITE_SERVER_ASSETS;
  const [status, setStatus] = useState(null);

  const handleKick = () => {
    // Logic to kick the member out of the group
    setStatus("kicked");
    console.log(`${username} has been kicked out of the group.`);
  };

  return (
    <div className="card-container">
      <Card className="profile-card bg-light">
        <Card.Body className="d-flex align-items-center">
          <Image src={`${assets}${member.picturePath}`} roundedCircle width={50} height={50} />
          <div className="profile-info ms-3">
            <Card.Title as="h5" className="mb-1">
              {member.username}
            </Card.Title>
          </div>
          <div className="profile-actions ms-auto">
          <Link to={`/profile/${member._id}`}>
                  <Button variant="primary" className="me-2">
                    Check Profile
                  </Button>
                </Link>
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
