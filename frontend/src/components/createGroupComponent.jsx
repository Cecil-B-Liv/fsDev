import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { useNavigate } from "react-router-dom"; // Use for redirecting after successful creation
import { createGroup } from "../apis/group.js"; // Assuming you have an API function to create a group
import "../styles/createGroupComponent.css";

const CreateGroupComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    groupVisibility: "public",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle form submission, including avatar processing
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const groupData = new FormData();

      // Access file input to get the selected avatar
      // const fileInput = document.getElementById("formFile");
      // if (fileInput.files.length > 0) {
      //   const file = fileInput.files[0];
      //   groupData.append("groupBannerPath", file); // Append the selected file
      //   console.log("Avatar file appended:", file.name);
      // } else {
      //   console.log("No avatar selected.");
      // }
      if (selectedFile) {
        groupData.append("groupBannerPath", selectedFile);
      }
      // Append the rest of the form data
      for (const key in formData) {
        groupData.append(key, formData[key]);
        console.log(`Appended ${key}: ${formData[key]}`);
      }

      // Log the formData before making the API call
      // console.log("FormData to be submitted:");
      // groupData.forEach((value, key) => {
      //   console.log(key, value);
      // });

      // Call the API to create the group
      await createGroup(groupData);
      console.log("Group created successfully");

      // Reset form after successful submission
      //   setFormData({
      //    groupName: "",
      //     groupDescription: "",
      //     groupVisibility: "public",
      //  });
      //setSelectedAvatar(null);

      // Navigate to groups page after creation
      navigate("/groups");
    } catch (error) {
      console.error("Error creating group:", error);
      setError(error.message || "An error occurred during group creation");
    }
  };

  return (
    <Container className="create-group-container">
      <h3 className="text-center my-4">CREATE A NEW GROUP</h3>
      {error && <p className="text-danger text-center">{error}</p>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>
            <strong>Group Name</strong>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter group name..."
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            <strong>Group's Description</strong>
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter group's description..."
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          />
        </Form.Group>

        <div className="text-center my-4">
          <Form.Label>
            <strong>Choose a Banner for Your Group</strong>
          </Form.Label>
          {/* <div className="avatar-container my-3">
            {selectedAvatar ? (
              <Image
                src={selectedAvatar}
                className="avatar-image"
                alt="Group Banner"
              />
            ) : (
              <Image
                src="default_avatar_image_path"
                className="avatar-image"
                alt="Default Avatar"
              />
            )}
          </div> */}
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Control
              type="file"
              name="groupBannerPath"
              onChange={(e) => {
                setSelectedFile(e.target.files[0]);
              }} // Preview the selected image
            />
          </Form.Group>
        </div>

        <Form.Group className="mb-4 text-center">
          <Form.Label>
            <strong>Group Privacy</strong>
          </Form.Label>
          <div>
            <Form.Check
              inline
              type="radio"
              label="Public"
              name="privacy"
              value="public"
              checked={formData.groupVisibility === "public"}
              onChange={(e) =>
                setFormData({ ...formData, groupVisibility: e.target.value })
              }
            />
            <Form.Check
              inline
              type="radio"
              label="Private"
              name="privacy"
              value="private"
              checked={formData.groupVisibility === "private"}
              onChange={(e) =>
                setFormData({ ...formData, groupVisibility: e.target.value })
              }
            />
          </div>
        </Form.Group>

        <Row className="mt-4">
          <Col className="d-flex justify-content-center">
            <Button
              variant="secondary"
              size="lg"
              className="mx-2"
              onClick={() => navigate("/groups")}
            >
              Cancel
            </Button>
            <Button variant="primary" size="lg" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default CreateGroupComponent;
