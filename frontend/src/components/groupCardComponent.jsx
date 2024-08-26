import React from 'react';
import { Link } from 'react-router-dom';

const GroupCard = ({ groupId, groupName, groupDescription, groupAvatar }) => {
  return (
    <div className="card mb-3" style={{ maxWidth: '18rem' }}>
      <img src={groupAvatar} alt={`${groupName} Avatar`} className="card-img-top rounded-circle mx-auto mt-3" style={{ width: '100px', height: '100px' }} />
      <div className="card-body text-center">
        <h5 className="card-title">{groupName}</h5>
        <p className="card-text text-muted">{groupDescription}</p>
        <Link to={`/group/${groupId}`} className="btn btn-primary">Go to Group</Link>
      </div>
    </div>
  );
};

export default GroupCard;
