import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/commentComponent.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const CommentComponent = ({ username, content, likes, replies, avatar }) => {
  return (
    <div className="container comment-container p-2 rounded">
      <div className="d-flex align-items-start">
        <img
          src={avatar}
          alt="Avatar"
          className="rounded-circle comment-avatar"
        />
        <div className="ms-2 w-100">
          <div className="d-flex justify-content-between">
            <div>
              <h6 className="mb-1 text-white">{username}</h6>{" "}
              <p className="mb-1 text-white">{content}</p>{" "}
            </div>
          </div>
          <hr className="my-1 comment-divider" />
          <div className="d-flex justify-content-start align-items-center">
            <div>
              <i className="bi bi-heart"></i> {likes}{" "}
            </div>
            <div className="ms-4">
              <i className="bi bi-chat"></i> {replies}{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentComponent;
