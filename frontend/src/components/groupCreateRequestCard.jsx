import { Card } from "react-bootstrap";
import Container from "react-bootstrap";

export default function GroupCreateRequestCard({username, imageSrc, }){
    return (
        <Container>
          <div className="card-container">
            <Card className="profile-card bg-light">
              <Card.Body className="d-flex align-items-center">
                <Image src={imageSrc} roundedCircle width={50} height={50} />
                <div className="profile-info ms-3">
                  <Card.Title as="h5" className="mb-1">
                    {username}
                  </Card.Title>
                  <Card.Text className="text-muted mb-0">{groupName}</Card.Text>
                </div>
                <div className="profile-actions ms-auto">
                  <Button variant="primary">Details</Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        </Container>
    )
}