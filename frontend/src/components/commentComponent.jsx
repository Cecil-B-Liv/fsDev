import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import "../styles/commentComponent.css";
import 'bootstrap-icons/font/bootstrap-icons.css';


const CommentComponent = ({ username, content, likes, avatar }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [commentText, setCommentText] = useState(content);
  const [tempCommentText, setTempCommentText] = useState(content);

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
            src={avatar || "https://via.placeholder.com/50"}
            alt="Avatar"
            roundedCircle
            className="comment-avatar"
          />
        </Col>
        <Col>
          <div className="d-flex justify-content-between">
            <div>
              <h6 className="mb-1 text-white">{username}</h6>
              {isEditing ? (
                <textarea
                  value={tempCommentText}
                  onChange={(e) => setTempCommentText(e.target.value)}
                  className="form-control mb-1"
                  rows={2}
                />
              ) : (
                <p className="mb-1 text-white">{commentText}</p>
              )}
            </div>
            <Dropdown align="end">
              <Dropdown.Toggle
                variant="none"
                id="dropdown-basic"
                className="text-white"
              >
                ...
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
            <div className="d-flex justify-content-start align-items-center">
              <div>
                <i className="bi bi-heart"></i> {likes}
              </div>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CommentComponent;
