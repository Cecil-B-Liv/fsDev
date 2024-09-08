import { useState, useRef, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { createComment } from "../apis/posts"; // Ensure this path is correct
import "../styles/userCommentComponent.css";

const UserCommentComponent = ({ postId }) => {
  const [comment, setComment] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state for comment submission
  const textareaRef = useRef(null);

  // Function to auto-expand the textarea as the user types
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

  // Handle comment submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!comment.trim()) {
      setError("Comment cannot be empty.");
      return;
    }

    try {
      setIsSubmitting(true); // Show a loading state
      // Call API to submit the comment
      await createComment(postId, comment);
      console.log("Comment submitted");

      // Clear the comment input field
      setComment("");
    } catch (error) {
      console.error("Error submitting comment:", error);
      setError("An error occurred while submitting the comment.");
    } finally {
      setIsSubmitting(false); 
    }
  };

  return (
    <Container className="comment-container p-3 rounded">
      <Row className="align-items-start">
        <Col>
          <Form
            onSubmit={handleSubmit}
            className="d-flex flex-column align-items-start"
          >
            <Form.Group controlId="userComment" style={{ width: "100%" }}>
              <Form.Control
                as="textarea"
                ref={textareaRef}
                rows={1}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write a comment..."
                className="auto-expand form-control mb-2"
                style={{ resize: "none", overflow: "hidden" }}
              />
            </Form.Group>
            {error && <div className="text-danger mb-2">{error}</div>}
            <Button
              variant="primary"
              type="submit"
              disabled={isSubmitting} // Disable the button while submitting
              className="submit-btn"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UserCommentComponent;
