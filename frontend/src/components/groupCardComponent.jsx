import '../styles/groupCardComponent.css';
import { Link } from 'react-router-dom';

const GroupCard = ({ groupId, groupName, groupDescription, groupAvatar }) => {
  return (
    <div className="group-card">
      <img src={groupAvatar} alt={`${groupName} Avatar`} className="group-avatar" />
      <h3>{groupName}</h3>
      <p>{groupDescription}</p>
      <Link to={`/group/${groupId}`} className="btn btn-primary">Go to Group</Link>
    </div>
  );
};

export default GroupCard;
