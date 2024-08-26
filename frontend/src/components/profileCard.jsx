import { useState } from "react";
import React from "react";
import "../styles/profileCard.css";

const ProfileCard = ({ username, location, imageSrc, mode }) => {
  const [status, setStatus] = useState(null);

  const handleAccept = () => {
    setStatus('accepted');
  };

  const handleDeny = () => {
    setStatus('denied');
  };

  return (
    <div className="card-container">
      <div className="profile-card">
        <div className="profile-image">
          <img src={imageSrc} alt={`${username}`} />
        </div>
        <div className="profile-info">
          <h5>{username}</h5>
          <p>{location}</p>
        </div>
        <div className="profile-actions">
          {mode === 'view' || status === 'accepted' ? (
            <button className="btn btn-primary">Check Profile</button>
          ) : status === 'denied' ? (
            <p>Denied</p>
          ) : (
            <>
              <button className="btn btn-primary" onClick={handleAccept}>
                Accept
              </button>
              <button className="btn btn-secondary" onClick={handleDeny}>
                Deny
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
