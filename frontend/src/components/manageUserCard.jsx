import { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

export default function ManageUserCard({ username, location, imageSrc, initialStatus }) {
  const [status, setStatus] = useState(initialStatus);

  // Code Template to handle button cick
  const handleSuspend = () => {
    setStatus("suspended");
    console.log(`${username} has been suspended.`);
  };

  const handleResume = () => {
    setStatus("active");
    console.log(`${username} has been resumed.`);
  };

  const cardBgColor = status === "active" ? "bg-success" : "bg-danger";

  return (
    <div className="card-container">
      <Card className={`profile-card ${cardBgColor} text-white`}>
        <Card.Body className="d-flex align-items-center">
          <Image src={imageSrc} roundedCircle width={50} height={50} />
          <div className="profile-info ms-3">
            <Card.Title as="h5" className="mb-1">
              {username}
            </Card.Title>
            <Card.Text className="text-white-50 mb-0">{location}</Card.Text>
            <Card.Text className="text-white-50 mb-0">
              Status: {status === "active" ? "Active" : "Suspended"}
            </Card.Text>
          </div>
          <div className="profile-actions ms-auto">
            {status === "active" ? (
              <Button variant="warning" onClick={handleSuspend}>
                Suspend
              </Button>
            ) : (
              <Button variant="success" onClick={handleResume}>
                Resume
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
