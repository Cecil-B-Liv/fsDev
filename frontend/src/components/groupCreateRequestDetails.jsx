import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";


//future parameter
//{username, groupName, groupDescription, avatarSrc, creationReason}

export default function GroupCreateRequestDetails() {
    // {
    //     const username = "JohnDoe"
    //     const groupName = "Photography Enthusiasts"
    //     const groupDescription = "A group for those who love to capture moments."
    //     const avatarSrc = "https://placehold.co/100x100"
    //     const creationReason = "To share and discuss photography tips and tricks."
    // }
   


    return (
    <Container className="admin-group-request-container">
      <h3 className="text-center my-4">GROUP CREATION REQUEST</h3>

      <Card className="p-3">
        <Row>
          <Col md={4} className="text-center">
            <Image src="https://placehold.co/100x100" roundedCircle className="avatar-image" />
            <h5 className="mt-3">JohnDoe</h5>
          </Col>
          <Col md={8}>
            <Card.Body>
              <Card.Title as="h4">"Photography Enthusiasts"</Card.Title>
              <Card.Text>
                <strong>Description:</strong> "A group for those who love to capture moments."
              </Card.Text>
              <Card.Text>
                <strong>Reason for Creation:</strong> "To share and discuss photography tips and tricks."
              </Card.Text>
            </Card.Body>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col className="d-flex justify-content-center">
            <Button variant="success" size="lg" className="mx-2">
              Accept
            </Button>
            <Button variant="danger" size="lg" className="mx-2">
              Deny
            </Button>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}


