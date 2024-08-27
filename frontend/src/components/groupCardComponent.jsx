import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const GroupCard = ({ groupId, groupName, groupDescription, groupAvatar }) => {
  return (
    <Card className="mb-3 text-center" style={{ maxWidth: '18rem' }}>
      <Card.Img 
        variant="top" 
        src= "https://placehold.co/50x50" //{groupAvatar} 
        alt={`${groupName} Avatar`} 
        className="rounded-circle mx-auto mt-3" 
        style={{ width: '100px', height: '100px' }} 
      />
      <Card.Body>
        <Card.Title>{groupName}</Card.Title>
        <Card.Text className="text-muted">{groupDescription}</Card.Text>
        <Link to={`/group/${groupId}`} className="btn btn-primary">Go to Group</Link>
      </Card.Body>
    </Card>
  );
};

export default GroupCard;
