import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { useState } from "react";
import "../styles/createGroupComponent.css";
import { Link } from "react-router-dom";


const CreateGroupComponent = () => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedAvatar(URL.createObjectURL(file)); // Preview the selected avatar image
    }
  };

  return (
    <Container className="create-group-container">
      <h3 className="text-center my-4">CREATE A NEW GROUP</h3>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>
            <strong>Group name</strong>
          </Form.Label>
          <Form.Control type="text" placeholder="Enter group name..." />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            <strong>Group's description</strong>
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter group's description..."
            className="auto-resize"
          />
        </Form.Group>

        <div className="text-center my-4">
          <Form.Label>
            <strong>Choose a banner for your group</strong>
          </Form.Label>
          <div className="avatar-container my-3">
            {selectedAvatar ? (
              <Image
                src={selectedAvatar}
                className="avatar-image"
                alt="Group Avatar"
              />
            ) : (
              <Image
                src="default_avatar_image_path" // You can replace this with a default placeholder
                roundedCircle
                className="avatar-image"
                alt="Default Avatar"
              />
            )}
          </div>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Control type="file" accept="image/*" onChange={handleAvatarChange} />
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
            />
            <Form.Check
              inline
              type="radio"
              label="Private"
              name="privacy"
            />
          </div>
        </Form.Group>

        <Row className="mt-4">
          <Col className="d-flex justify-content-center">
            <Link to={"/groups"}>
              <Button variant="secondary" size="lg" className="mx-2">
                Cancel
              </Button>
            </Link>
            <Button variant="primary" size="lg" className="mx-2">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default CreateGroupComponent;
