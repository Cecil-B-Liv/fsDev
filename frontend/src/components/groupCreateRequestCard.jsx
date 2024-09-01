import { Card } from "react-bootstrap";
import {Container} from "react-bootstrap";
import {Button} from "react-bootstrap";
import {Image} from "react-bootstrap";
import { Link } from "react-router-dom";
export default function GroupCreateRequestCard({username, imageSrc, groupName }){
    return (
        <Container>
          <div className="card-container">
            <Card className="profile-card bg-light">
              <Card.Body className="d-flex align-items-center">
                <Image src="https://placehold.co/50x50" roundedCircle width={50} height={50} />
                <div className="profile-info ms-3">
                  <Card.Title as="h5" className="mb-1">
                    {username}
                  </Card.Title>
                  <Card.Text className="text-muted mb-0"> Request to create: "{groupName}" Group</Card.Text>
                </div>
                <div className="profile-actions ms-auto">
                  <Link to="/SiteAdmin/Details">
                    <Button variant="primary">Details</Button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </div>
        </Container>
    )
}