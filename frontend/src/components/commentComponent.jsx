import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/commentComponent.css";

const CommentComponent = ({ username, content, likes, replies, avatar }) => {
  return (
    <Container className="comment-container p-3 rounded">
      <Row className="align-items-start">
        <Col xs="auto">
          <Image
            src={avatar}
            alt="Avatar"
            roundedCircle
            className="comment-avatar"
          />
        </Col>
        <Col>
          <div className="d-flex justify-content-between">
            <div>
              <h6 className="mb-1 text-white">{username}</h6>
              <p className="mb-1 text-white">{content}</p>
            </div>
          </div>
          <hr className="my-1 comment-divider" />
          <div className="d-flex justify-content-start align-items-center">
            <div>
              <i className="bi bi-heart"></i> {likes}
            </div>
            <div className="ms-4">
              <i className="bi bi-chat"></i> {replies}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CommentComponent;
