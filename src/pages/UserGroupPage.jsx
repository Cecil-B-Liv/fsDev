import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SideNavComponent from '../components/sideNavComponent';
import GroupCard from '../components/groupCard';
import HeaderComponent from '../components/headerComponent';
import '../styles/UserGroupPage.css';

//data test

const sampleGroups = [
  { groupName: "Photography Enthusiasts", groupDescription: "A group for people who love capturing moments.", groupAvatar: "https://via.placeholder.com/150" },
  { groupName: "Book Lovers", groupDescription: "Discuss and share your favorite books and authors.", groupAvatar: "https://via.placeholder.com/150" },
  { groupName: "Fitness Buffs", groupDescription: "A community to share workouts, diets, and fitness goals.", groupAvatar: "https://via.placeholder.com/150" },
  { groupName: "Travelers Unite", groupDescription: "Share travel stories, tips, and bucket lists.", groupAvatar: "https://via.placeholder.com/150" },
  { groupName: "Tech Innovators", groupDescription: "Discuss the latest in technology and innovation.", groupAvatar: "https://via.placeholder.com/150" },
  { groupName: "Art & Design", groupDescription: "For those who love painting, drawing, and designing.", groupAvatar: "https://via.placeholder.com/150" },
  { groupName: "Music Fans", groupDescription: "Share your favorite songs, albums, and artists.", groupAvatar: "https://via.placeholder.com/150" },
  { groupName: "Foodies", groupDescription: "Discuss recipes, restaurants, and culinary adventures.", groupAvatar: "https://via.placeholder.com/150" },
  { groupName: "Movie Buffs", groupDescription: "A place to talk about your favorite films and actors.", groupAvatar: "https://via.placeholder.com/150" },
  { groupName: "Environmentalists", groupDescription: "Discuss eco-friendly practices and environmental issues.", groupAvatar: "https://via.placeholder.com/150" }
];
const UserGroupPage = () => {
  return (
    <Container fluid>
      <HeaderComponent />
      <Row>
        <Col xs={3} md={3} className="sidebar-container">
          <SideNavComponent />
        </Col>
        <Col xs={9} md={9} className="group-card-container">

        <h1 class="display-3">Joined Groups</h1>
        <br></br>

          <div className="group-card-wrapper">
            {Array.from({ length: 30 }).map((_, idx) => (
              <GroupCard key={idx} />
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default UserGroupPage;
