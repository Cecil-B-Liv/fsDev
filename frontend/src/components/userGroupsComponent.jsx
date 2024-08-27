import React from 'react';
import GroupCard from './groupCardComponent';
import { Container, Row, Col } from 'react-bootstrap'; 

const UserGroupsComponent = ({ groups }) => {
  return (
    <Container className="mt-5 d-flex justify-content-center">
      {/* <h2 className="text-center">Joined Groups</h2> */}
      <hr />
      <Row>
        {groups.map((group) => (
          <Col key={group.groupId} className="mb-4" xs={12} sm={6} md={4} lg={3} xl={2}>
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
