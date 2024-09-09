import { useState } from "react";
import { createGroupPost } from "../apis/group"; // Import the correct group-specific API
import { useParams } from "react-router-dom"; // To get the groupId from URL

import {Container, Button, Form, Card, Row, Col} from "react-bootstrap";

import "../styles/createPostHeaderComponent.css";

export default function CreatePostGroupComponent({ groupId }) {
  const [formData, setFormData] = useState({
    postDescription: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);

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

      // Call the correct API for group posts with the groupId
      await createGroupPost(groupId, postData);

      console.log("Group post created successfully:", postData);
      window.location.reload();
      //Reset form after successful post
      //setFormData({ postDescription: "" });
      //setSelectedFile(null);
      //window.location.reload(); // Reload the page after submission
    } catch (error) {
      console.error("Error creating group post:", error);
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
                rows={2}
                className="my-2"
                placeholder="What's on your mind in the group?"
                value={formData.postDescription}
                onChange={(e) => {
                  setFormData({ ...formData, postDescription: e.target.value });
                }}
                style={{ resize: "none", overflow: "hidden" }}
              />

              {/* Image Upload */}
              <Row>
                <Col className="d-flex justify-content-start">
                  <Form.Control
                    type="file"
                    name="postPicturePath"
                    onChange={(e) => {
                      setSelectedFile(e.target.files[0]);
                    }}
                  />
                </Col>
                <Col className="d-flex justify-content-end">
                  <Button variant="primary" type="submit">
                    Post in Group
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
