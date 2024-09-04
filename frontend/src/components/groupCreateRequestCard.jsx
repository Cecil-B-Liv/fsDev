import { Card } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Image } from "react-bootstrap";
import { useState } from "react";

export default function GroupCreateRequestCard({
  username,
  imageSrc,
  groupName,
  groupDescription,
  reasons,
}) {

  const [response, setResponse] = useState("");

  // Handler for Accept or Deny template
  const handleAccept = () => {
    setResponse("Request Accepted");
    console.log("Request Accepted");

  };


  const handleDeny = () => {
    setResponse("Request Denied");
    console.log("Request Denied");

  };

  return (
    <Container>
      <div className="card-container">
        <Card className="profile-card bg-light">
          <Card.Body className="d-flex align-items-center">
            <Image
              src={imageSrc || "https://placehold.co/50x50"}
              roundedCircle
              width={50}
              height={50}
            />
            <div className="profile-info ms-3">
              <Card.Title as="h5" className="mb-1">
                {username}
              </Card.Title>
              <Card.Text className="text-muted mb-0">
                <strong>Request to create: </strong>"{groupName}" Group
              </Card.Text>
              <Card.Text className="text-muted mb-0">
                <strong>Group Description: </strong> {groupDescription}
              </Card.Text>
              <Card.Text className="text-muted mb-0">
                <strong>Reason: </strong>{reasons}
              </Card.Text>
            </div>
            <div className="profile-actions ms-auto">
              <Button variant="success" className="me-2" onClick={handleAccept}>
                Accept
              </Button>
              <Button variant="danger" onClick={handleDeny}>
                Deny
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}
