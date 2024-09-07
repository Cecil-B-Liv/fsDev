import { useState, useRef, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../styles/userCommentComponent.css";

const UserCommentComponent = ({ avatar }) => {
  const [comment, setComment] = useState("");
  const textareaRef = useRef(null);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
    autoExpandTextarea();
  };

  const autoExpandTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    autoExpandTextarea();
  }, [comment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Comment Submitted: " + comment);
    setComment("");
  };

  return (
    <Container className="comment-container p-3 rounded">
      <Row className="align-items-start">
        <Col xs="auto">
          <img
            src={avatar || "https://via.placeholder.com/50"}
            alt="Avatar"
            className="comment-avatar"
          />
        </Col>
        <Col className="position-relative">
          <Form onSubmit={handleSubmit} className="d-flex flex-column align-items-start  ">
            <Form.Group controlId="userComment">
              <Form.Control
                as="textarea"
                ref={textareaRef}
                rows={1}
                value={comment}
                onChange={handleCommentChange}
                placeholder="Write a comment..."
                className="auto-expand form-control mb-2"
                style={{ resize: "none", overflow: "hidden", width: "320%" }}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="submit-btn position-absolute"
            >
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UserCommentComponent;
