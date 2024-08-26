import ProfileCard from "./ProfileCardComponent";
import "../styles/friendRequestCardComponent.css";
import "bootstrap/dist/css/bootstrap.min.css";
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
    <div className='container marginS'> 
    <div className="card bg">
      <h5 className="card-header">Friend request</h5>
      <div className="card-body">
        <div className="card-title">You have {numRequests} friend request(s)</div>
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
    </div>
  );
};

export default FriendRequestCard;
