import React from 'react';
import GroupCard from './groupCardComponent';
import { Container, Row, Col } from 'react-bootstrap'; 
import {Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UserGroupsComponent = ({ groups }) => {
  return (
    <Container className="mt-5">
       <div className="d-flex justify-content-center mb-4">
          <Button variant="primary" size="lg">
            <Link to="/HomePage/CreateGroup" className="text-white text-decoration-none">
              ➕ Create New Group
            </Link>
          </Button>
        </div>
      <h2 className="text-center">Created Groups</h2>
      <hr />
      <Row>
        {groups.map((group) => (
          <Col key={group.groupId} className="mb-2">
            <GroupCard
              groupId={group.groupId}
              groupName={group.groupName}
              groupDescription={group.groupDescription}
              groupAvatar={group.groupAvatar}
            />
          </Col>
        ))}
      </Row>
      <h2 className="text-center">Joined Groups</h2>
      <hr />
      <Row>
        {groups.map((group) => (
          <Col key={group.groupId} className="mb-2">
            <GroupCard
              groupId={group.groupId}
              groupName={group.groupName}
              groupDescription={group.groupDescription}
              groupAvatar={group.groupAvatar}
            />
          </Col>
        ))}
      </Row>
      
    </Container>
  );
};

export default UserGroupsComponent;
