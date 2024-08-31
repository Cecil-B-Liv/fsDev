import { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CommentListComponent from "../components/commentsListComponent";
import ReactionComponent from "../components/reactionComponent"; 
import "../styles/userPostComponent.css";

export default function UserPost() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const postText = `Some quick example text to build on the card title and make up the bulk of the card's content. Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus atque impedit fuga explicabo quo voluptate.
    Vero ipsum totam iure id, enim rem voluptatibus quasi consequatur mollitia. Officiis enim blanditiis natus. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum libero molestiae sequi fugiat nisi aliquam deserunt, optio doloremque tenetur laborum necessitatibus molestias repellendus sunt rem unde aliquid harum rerum sit. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime earum animi ducimus odio accusantium porro sequi explicabo rem dolore inventore nulla, odit nihil reprehenderit labore corporis, tenetur dignissimos, repudiandae blanditiis?`;

  const shortenedText = postText.slice(0, 100);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <Container className="d-flex justify-content-center mb-4">
      <Card className="postCard" style={{ backgroundColor: '#EFF3F4' }}>
        <Card.Header>
          <Row>
            <Col className="userPostHeader d-flex justify-content-start align-items-center gap-2">
              <Image src="https://placehold.co/50x50" roundedCircle />
              <h5>John Doe</h5>
              <a href="#johndoe" className="pb-2">
                @johndoe
              </a>
            </Col>
            <Col className="d-flex row-column justify-content-end align-items-baseline gap-2 mt-2">
              <p>15 mins ago</p>
              <Button variant="none">📤</Button>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Card.Text className="postText">
            {isExpanded ? postText : shortenedText + "..."}
            <Button variant="link" onClick={toggleExpanded}>
              {isExpanded ? "Show Less" : "Show More"}
            </Button>
          </Card.Text>
          <Card.Img variant="top" src="https://placehold.co/600x400" />
          <Row className="gap-2 mt-3">
            <Col xs="auto">
              <ReactionComponent /> 
            </Col>
            <Col>
              <Button variant="" onClick={toggleComments}>
                💬 32
              </Button>
            </Col>
          </Row>
          {showComments && <CommentListComponent />}
        </Card.Body>
      </Card>
    </Container>
  );
}
