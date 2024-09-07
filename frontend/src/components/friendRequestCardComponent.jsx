import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import ProfileCard from "./profileCardComponent";
import "../styles/friendRequestCardComponent.css"

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
    <Container className="marginS">
      <Card className="bg">
        <Card.Header as="h5">Friend Request</Card.Header>
        <Card.Body>
          <Card.Title>You have {numRequests} friend request(s)</Card.Title>
          {profiles.map((profile, index) => (
            <ProfileCard
              key={index}
              username={profile.username}
              location={profile.location}
              imageSrc={profile.imageSrc}
            />
          ))}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default FriendRequestCard;
