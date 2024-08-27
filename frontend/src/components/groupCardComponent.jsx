import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const GroupCard = ({ groupId, groupName, groupDescription, groupAvatar }) => {
  return (
    <Card className="mb-3 text-center" style={{ width: '18rem', height: '20rem', display: 'flex', flexDirection: 'column' }}>
      <Card.Img 
        variant="top" 
        src="https://placehold.co/50x50" //{groupAvatar} 
        alt={`${groupName} Avatar`} 
        className="rounded-circle mx-auto mt-3" 
        style={{ width: '80px', height: '80px' }}
      />
      <Card.Body style={{ flex: '1', display: 'flex', flexDirection: 'column', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ marginTop: '0.5rem' }}>
          <Card.Title>{groupName}</Card.Title>
        </div>   
          <Card.Text className="text-muted" style={{ fontSize: '0.875rem', textAlign: 'center' }}>
            {groupDescription}
          </Card.Text>
      </Card.Body>
      <Card.Footer className="text-center">
        <Link to={`/group/${groupId}`} className="btn btn-primary">Go to Group</Link>
      </Card.Footer>
    </Card>
  );
};

export default GroupCard;
