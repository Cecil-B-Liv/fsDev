import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Image, Dropdown, Button } from "react-bootstrap";
import ReactionComponent from "./reactionComponent";
import "../styles/commentComponent.css";

const CommentComponent = ({ commenter, content }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [commentText, setCommentText] = useState(content);
  const [tempCommentText, setTempCommentText] = useState(content);

  const assets = import.meta.env.VITE_SERVER_ASSETS;
  const textareaRef = useRef(null);

  const handleTextareaChange = (e) => {
    setTempCommentText(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };
  
  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [isEditing]);

  const handleEditComment = () => {
    setIsEditing(true);
  };

  const handleRemoveComment = () => {
    alert("Comment removed!");
  };

  const handleSaveComment = () => {
    setCommentText(tempCommentText);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setTempCommentText(commentText);
    setIsEditing(false);
  };

  return (
    <Container className="comment-container p-3 rounded">
      <Row className="align-items-start">
        <Col xs="auto">
          <Image
            src={`${assets}${commenter.picturePath}`}
            alt={commenter.username}
            roundedCircle
            className="comment-avatar"
          />
        </Col>
        <Col>
          <div className="d-flex justify-content-between">
            <div>
              <h6 className="mb-1 text-white">{commenter.username}</h6>
              {isEditing ? (
                <textarea
                  ref={textareaRef}
                  value={tempCommentText}
                  onChange={handleTextareaChange}
                  className="form-control mb-1"
                  rows={2}
                  style={{ resize: "none", overflow: "hidden", width: "320%" }}
                />
              ) : (
                <p className="mb-1 text-white">{commentText}</p>
              )}
            </div>
            <Dropdown align="end">
              <Dropdown.Toggle
                variant="none"
                id="dropdown-basic"
                className="text-white p-0"
              >
                <i className="bi bi-three-dots-vertical"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleEditComment}>
                  Edit Comment
                </Dropdown.Item>
                <Dropdown.Item onClick={handleRemoveComment}>
                  Remove Comment
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <hr className="my-1 comment-divider" />
          {isEditing ? (
            <form className="d-flex justify-content-end">
              <Button
                variant="primary"
                className="me-2"
                onClick={handleSaveComment}
              >
                Save
              </Button>
              <Button variant="secondary" onClick={handleCancelEdit}>
                Cancel
              </Button>
            </form>
          ) : (
            <></>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CommentComponent;
