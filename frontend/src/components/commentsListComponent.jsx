import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CommentComponent from "./commentComponent";
import "../styles/commentListComponent.css"; // Import the custom CSS file

const comments = [
  {
    username: "Furry",
    content: "Can I f both?",
    likes: 0,
    replies: 0,
    avatar: "path_to_avatar_image_1", // Replace with actual image path
  },
  {
    username: "JohnDoe",
    content: "This is really interesting, thanks for sharing!",
    likes: 12,
    replies: 3,
    avatar: "path_to_avatar_image_2", // Replace with actual image path
  },
  {
    username: "JaneSmith",
    content: "I completely agree with your point!",
    likes: 5,
    replies: 2,
    avatar: "path_to_avatar_image_3", // Replace with actual image path
  },
  {
    username: "MikeBrown",
    content: "Can someone explain this further?",
    likes: 2,
    replies: 1,
    avatar: "path_to_avatar_image_4", // Replace with actual image path
  },
];

const CommentListComponent = () => {
  return (
    <div className="container ">
      {comments.map((comment, index) => (
        <div key={index} className="comment-item">
          <CommentComponent
            username={comment.username}
            content={comment.content}
            likes={comment.likes}
            replies={comment.replies}
            avatar={comment.avatar}
          />
        </div>
      ))}
    </div>
  );
};

export default CommentListComponent;
