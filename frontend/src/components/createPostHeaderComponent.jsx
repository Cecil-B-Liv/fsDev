import { useRef, useState, useEffect } from "react";

import { createPost } from "../apis/posts";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "../styles/createPostHeaderComponent.css";

export default function CreatePostHeader() {
  const [formData, setFormData] = useState({
    postVisibility: "",
    postDescription: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);

  const textareaRef = useRef(null);

  // Handle Submit Action
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const postData = new FormData();

      if (selectedFile) {
        postData.append("postPicturePath", selectedFile);
      }

      for (const key in formData) {
        postData.append(key, formData[key]);
      }

      await createPost(postData);

      console.log("Post created successfully:", postData);

     
      window.location.reload();
    } catch (error) {
      console.error("Error creating post:", error);
      setError(error.message || "An error occurred");
    }
  };

  return (
    <>
      <Container className="d-flex justify-content-center mb-4">
        <Card className="createPostCard" style={{ backgroundColor: "#EFF3F4" }}>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Control
                as="textarea"
                // ref={textareaRef}
                rows={2}
                className="my-2"
                placeholder="What's on your mind?"
                value={formData.postDescription}
                onChange={(e) => {
                  setFormData({ ...formData, postDescription: e.target.value });
                }}
                style={{ resize: "none", overflow: "hidden" }}
              />

              {/* Visibility Radio Buttons */}
              <Row className="my-3">
                <Col>
                  <Form.Check
                    type="radio"
                    id="public"
                    label="Public"
                    name="postVisibility"
                    value="public"
                    checked={formData.postVisibility === "public"}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        postVisibility: e.target.value,
                      })
                    }
                  />
                  <Form.Check
                    type="radio"
                    id="friends"
                    label="Friends"
                    name="postVisibility"
                    value="friends"
                    checked={formData.postVisibility === "friends"}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        postVisibility: e.target.value,
                      })
                    }
                  />
                </Col>
              </Row>

              {/*Image*/}
              <Row>
                <Col className="d-flex justify-content-start">
                  <Form.Control
                    type="file"
                    name="postPicturePath"
                    onChange={(e) => {
                      setSelectedFile(e.target.files[0]);
                    }}
                  ></Form.Control>
                </Col>
                <Col className="d-flex justify-content-end">
                  <Button variant="primary" type="submit">
                    Post
                  </Button>
                </Col>
              </Row>
              {error && <div className="error">{error}</div>}
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
