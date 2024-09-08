import GroupCard from './groupCardComponent';
import { Container, Row, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';

import { checkAuth } from '../apis/auth.js';
import { getUserGroups } from '../apis/users';

const UserGroupsComponent = () => {

  const [currentUserID, setCurrentUserID] = useState("");
  const [userGroups, setUserGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get current user ID
  useEffect(() => {
    const user = async () => {
      const response = await checkAuth();
      const currentUser = response;
      setCurrentUserID(currentUser.userId);
    };

    user();
  }, []);

  // Get User Group
  
  useEffect(() =>{
    const fetchUserGroups = async () =>{
      try {
        const response = await getUserGroups(currentUserID);
        setUserGroups(response);
        
      } catch (error){
        console.error("Error fetching groups: ", error);
        setError(error); // Set error state
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchUserGroups();
  }, [currentUserID]);
  // useEffect(() =>{
  //   const fetchGroups = async () =>{
  //     try {
  //       const response = await getGroups();

  //       setGroups(response);
  //       console.log(`Group data fetch: ${response}`);
  //     } catch (error) {
  //       console.error("Error fetching groups: ", error);
  //       setError(error); // Set error state
  //     } finally {
  //       setIsLoading(false); // Set loading to false regardless of success or failure
  //     }
  //   }

  //   fetchGroups();
  // }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Display loading indicator
  }

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-center mb-4">

        {/*Create Group*/}
        <Button variant="primary" size="lg">
          <Link to="/creategroup" className="text-white text-decoration-none">
            ➕ Create New Group
          </Link>
        </Button>
      </div>

      {/*Groups Display*/}
      <h2 className="text-center">Joined Groups</h2>
      <hr />
      {userGroups.length === 0 ? (
        <div className="text-center">No groups joined yet</div>
      ) : (
        <Row>
          {userGroups.map((group) => (
            <Col key={group.groupId} className="mb-2">
              <GroupCard
                groupId={group.groupId}
                groupName={group.name}
                groupDescription={group.description}
                groupAvatar={group.groupBannerPath}
              />
            </Col>
          ))}
        </Row>
      )}

    </Container>
  );
};

export default UserGroupsComponent;
