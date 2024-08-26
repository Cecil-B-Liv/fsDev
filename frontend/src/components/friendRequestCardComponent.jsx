import ProfileCard from "./profileCardComponent";
import "../styles/friendRequestCardComponent.css";

const FriendRequestCard = () => {
  const profiles = [
    {
      username: "Dude",
      location: "Living in California",
    },
    {
      username: "Dude",
      location: "Living in California",
    },
  ];

  const numRequests = profiles.length;

  return (
    <div className="friend-request-card">
      <div className="header">
        <h5>Friend request</h5>
      </div>
      <div className="content">
        <p>You have {numRequests} friend requests</p>
        {profiles.map((profile, index) => (
          <ProfileCard
            key={index}
            username={profile.username}
            location={profile.location}
            imageSrc={profile.imageSrc}
          />
        ))}
      </div>
    </div>
  );
};

export default FriendRequestCard;
