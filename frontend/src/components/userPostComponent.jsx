import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
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

import { updatePost, deletePost } from "../apis/posts";
import { checkAuth } from "../apis/auth.js";

export default function UserPost({ post }) {
  const assets = import.meta.env.VITE_SERVER_ASSETS;

  const [isExpanded, setIsExpanded] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [postText, setPostText] = useState(`${post.postDescription}`);
  const [tempPostText, setTempPostText] = useState(postText);

  const [updateFields, setUpdateFields] = useState({
    newPostVisibility: "public",
    newPostDescription: postText,
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState("");
  const [isOwner, setIsOwner] = useState(false);

  const postId = post._id;

  const shortenedText = postText.slice(0, 100);

  useEffect(() => {
    const user = async () => {
      const response = await checkAuth();
      setCurrentUser(response);
    };

    user();
  }, []);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError(null);

  //   try {
  //     const updateFields = new FormData();

  //     if (selectedFile) {
  //       updateFields.append("postPicturePath", selectedFile);
  //     }

  //     for (const key in updateFields) {
  //       updateFields.append(key, updateFields[key]);
  //     }

  //     await updatePost(postId, updateFields);

  //     console.log("Post created successfully:", updateFields);

  //     window.location.reload();
  //   } catch (error) {
  //     console.error("Error creating post:", error);
  //     setError(error.message || "An error occurred");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Create FormData and append necessary fields
      const formData = new FormData();
      if (selectedFile) {
        formData.append("postPicturePath", selectedFile);
      }
      formData.append("newPostVisibility", updateFields.newPostVisibility);
      formData.append("newPostDescription", updateFields.newPostDescription);

      await updatePost(postId, formData);

      console.log("Post updated successfully:", formData);
      window.location.reload();
    } catch (error) {
      console.error("Error updating post:", error);
      setError(error.message || "An error occurred");
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleEditPost = () => {
    setIsEditing(true);
  };

  const handleRemovePost = async () => {
    console.log(postId);
    await deletePost(postId);

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
              <Image
                src={`${assets}${post.userId.picturePath}`}
                roundedCircle
                style={{ width: "25%", height: "auto" }}
              />
              <h5>{post.userId.username}</h5>
              <a href="#johndoe" className="pb-2">
                {post.userId.displayName}
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
              <Form onSubmit={handleSubmit}>
                <Form.Select
                  aria-label="Visibility"
                  value={updateFields.newPostVisibility}
                  onChange={(e) =>
                    setUpdateFields({
                      ...updateFields,
                      newPostVisibility: e.target.value,
                    })
                  }
                >
                  <option value="public">Public</option>
                  <option value="friends">Friends</option>
                </Form.Select>
                <textarea
                  className="form-control mb-2"
                  rows="5"
                  placeholder={tempPostText}
                  value={updateFields.newPostDescription}
                  onChange={(e) =>
                    setUpdateFields({
                      ...updateFields,
                      newPostDescription: e.target.value,
                    })
                  }
                />
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Control
                    type="file"
                    name="postPicturePath"
                    onChange={(e) => {
                      setSelectedFile(e.target.files[0]);
                    }}
                  />
                </Form.Group>
                <Button
                  type="submit"
                  variant="primary"
                  //onClick={handleSaveEdit}
                  className="me-2"
                >
                  Save
                </Button>
                <Button variant="secondary" onClick={handleCancelEdit}>
                  Cancel
                </Button>
              </Form>
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
            <Card.Img variant="top" src={`${assets}${post.postPicturePath}`} />
          )}
          <Row className="gap-2 mt-3">
            <Col xs="auto">
              <ReactionComponent postId={post._id} />
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
          {showComments && (
            <CommentListComponent comments={post.postComments} />
          )}
        </Card.Body>
        <Card.Footer>
          <UserCommentComponent postId={post._id} />
        </Card.Footer>
      </Card>
    </Container>
  );
}
