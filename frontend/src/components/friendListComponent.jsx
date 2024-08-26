import React from "react";
import ProfileCard from "./ProfileCardComponent";
import "../styles/FriendRequestCardComponent.css";
import "bootstrap/dist/css/bootstrap.min.css";

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
    <div className="container marginS">
      <div className="card bg">
        <h5 className="card-header">Friends List</h5>
        <div className="card-body">
          <div className="card-title">
            You have {numFriends} friend(s)
          </div>
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
    </div>
  );
};

export default FriendList;
