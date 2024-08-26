import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import "../styles/createGroupComponent.css";

const CreateGroupComponent = () => {
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
            <strong>Choose an avatar for your group</strong>
          </Form.Label>
          <div className="avatar-container my-3">
            <Image
              src="path_to_avatar_image"
              roundedCircle
              className="avatar-image"
            />
          </div>
          <Button variant="secondary">Choose from library</Button>
        </div>

        <Form.Group className="mb-3">
          <Form.Label>
            <strong>Reason to create the group</strong>
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter it here..."
            className="auto-resize"
          />
        </Form.Group>

        <Row className="mt-4">
          <Col className="d-flex justify-content-center">
            <Button variant="secondary" size="lg" className="mx-2">
              Cancel
            </Button>
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
