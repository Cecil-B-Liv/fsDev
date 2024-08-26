import React from "react";
import ProfileCard from "./ProfileCard";
import "../styles/FriendRequestCardComponent"; 

const FriendList = () => {
  const profiles = [
    {
      username: "Dude",
      location: "Living in California",
      imageSrc: "path_to_image_1", 
    },
    {
      username: "Dude",
      location: "Living in California",
      imageSrc: "path_to_image_2", 
    },
   
  ];

  const numFriends = profiles.length;

  return (
    <div className="friend-list-card">
      <div className="header">
        <h5>Friend List</h5>
      </div>
      <div className="content">
        <p>You have {numFriends} friends</p>
        {profiles.map((profile, index) => (
          <ProfileCard
            key={index}
            username={profile.username}
            location={profile.location}
            imageSrc={profile.imageSrc}
            mode="view" 
          />
        ))}
      </div>
    </div>
  );
};

export default FriendList;
