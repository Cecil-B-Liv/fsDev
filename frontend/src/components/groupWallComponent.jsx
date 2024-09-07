import { Container, Image, Row, Col, Nav } from 'react-bootstrap';  // not standard
import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function GroupWall() {
  const [activeTab, setActiveTab] = useState('posts');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Container fluid className="p-0 m-0">
      {/* Group Image */}
      <Row>
        <Image 
          src="https://placehold.co/800x400" 
          fluid 
          style={{ width: '100%', height: '20rem', objectFit: 'cover' }} 
          alt="Group Header" 
        />
      </Row>

      {/* Owner Information */}
      <Row className="bg-danger text-white py-2">
        <Col>
          <h5 className="mb-0 text-center">Owner: User 1 Test</h5>
        </Col>
      </Row>

      {/* Group Name */}
      <Row className="bg-primary text-white py-3">
        <Col>
          <h3 className="mb-0 text-center">Group Name Testing</h3>
        </Col>
      </Row>

      {/* Navigation Tabs */}
      <Row className="bg-light py-3">
        <Col className="d-flex justify-content-center">
          <Nav variant="pills">
            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/HomePage/Group/GroupFeeds"
                onClick={() => handleTabClick('posts')}
                className={activeTab === 'posts' ? 'active text-white' : 'text-dark'}
                style={{ 
                  backgroundColor: activeTab === 'posts' ? '#f44336' : 'transparent',
                  borderRadius: '50px',
                  padding: '0.5rem 1.5rem',
                  marginRight: '0.5rem'
                }}
              >
                Posts
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/HomePage/Group/GroupMemebers"
                onClick={() => handleTabClick('members')}
                className={activeTab === 'members' ? 'active text-white' : 'text-dark'}
                style={{ 
                  backgroundColor: activeTab === 'members' ? '#f44336' : 'transparent',
                  borderRadius: '50px',
                  padding: '0.5rem 1.5rem'
                }}
              >
                Members
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
      </Row>

      {/* Render the component based on the selected tab */}
      <Row className="pt-4">
        <Col>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}
