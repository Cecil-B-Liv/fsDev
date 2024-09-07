import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import ProfileCard from "./profileCardComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/friendRequestCardComponent.css";

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
    <Container className="marginS">
      <Card className="bg">
        <Card.Header as="h5">Friends List</Card.Header>
        <Card.Body>
          <Card.Title>You have {numFriends} friend(s)</Card.Title>
          {profiles.map((profile, index) => (
            <ProfileCard
              key={index}
              username={profile.username}
              location={profile.location}
              imageSrc={profile.imageSrc}
              mode="view"
            />
          ))}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default FriendList;
