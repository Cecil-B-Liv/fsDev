import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import CommentListComponent from "../components/commentsListComponent";
import ReactionComponent from "../components/reactionComponent";
import "../styles/userPostComponent.css";
import UserCommentComponent from "../components/userCommentComponent";

export default function UserPost(post) {
  const assets = import.meta.env.VITE_SERVER_ASSETS;

  const [isExpanded, setIsExpanded] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [postText, setPostText] = useState(
    `${post.postDescription}`
  );
  const [tempPostText, setTempPostText] = useState(postText);

  const shortenedText = postText.slice(0, 100);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleEditPost = () => {
    setIsEditing(true);
  };

  const handleRemovePost = () => {
    alert("Post removed!");
  };

  const handleSaveEdit = () => {
    setPostText(tempPostText);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setTempPostText(postText);
    setIsEditing(false);
  };

  return (
    <Container className="d-flex justify-content-center mb-4">
      <Card className="postCard" style={{ backgroundColor: "#EFF3F4" }}>
        <Card.Header>
          <Row>
            <Col className="userPostHeader d-flex justify-content-start align-items-center gap-2">
              <Image src={`${assets}${post.postPicturePath}`} roundedCircle />
              <h5>{post.username}</h5>
              <a href="#johndoe" className="pb-2">
                {post.displayName}
              </a>
            </Col>
            <Col className="d-flex row-column justify-content-end align-items-baseline gap-2 mt-2">
              <p>{post.createdAt}</p>
              <Dropdown align="end">
                <Dropdown.Toggle variant="none" id="dropdown-basic">
                  📤
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleEditPost}>
                    Edit Post
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleRemovePost}>
                    Remove Post
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          {isEditing ? (
            <>
              <textarea
                className="form-control mb-2"
                rows="5"
                value={tempPostText}
                onChange={(e) => setTempPostText(e.target.value)}
              />
              <Button
                variant="primary"
                onClick={handleSaveEdit}
                className="me-2"
              >
                Save
              </Button>
              <Button variant="secondary" onClick={handleCancelEdit}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Card.Text className="postText">
                {isExpanded ? postText : shortenedText + "..."}
                <Button variant="link" onClick={toggleExpanded}>
                  {isExpanded ? "Show Less" : "Show More"}
                </Button>
              </Card.Text>
            </>
          )}
          {!isEditing && (
            <Card.Img variant="top" src="https://placehold.co/600x400" />
          )}
          <Row className="gap-2 mt-3">
            <Col xs="auto">
              <ReactionComponent />
            </Col>
            <Col>
              <Button
                variant="link"
                onClick={toggleComments}
                className="no-underline chat-icon-button-text"
              >
                <i className="bi bi-chat chat-icon"></i>{" "}
                <span className="chat-number">32</span>
              </Button>
            </Col>
          </Row>
          {showComments && <CommentListComponent />}
        </Card.Body>
        <Card.Footer>
          <UserCommentComponent avatar="https://placehold.co/50x50" />
        </Card.Footer>
      </Card>
    </Container>
  );
}
