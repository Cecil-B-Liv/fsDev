import { Container, Card, Spinner, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getGroup } from "../apis/group";
import ProfileCard from "./profileCardComponent";

export default function GroupMemberList() {
  const { groupId } = useParams(); // Get groupId from URL params
  const assets = import.meta.env.VITE_SERVER_ASSETS;

  const [groupMemberList, setGroupMemberList] = useState([]); // Fixed typo
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [groupDetails, setGroupDetails] = useState({});

  // FETCH GROUP DETAILS
  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const response = await getGroup(groupId);
        setGroupDetails(response);
        setGroupMemberList(response.groupMemberList || []); // Ensure we set an array
      } catch (error) {
        console.error("Error fetching group details:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGroupDetails();
  }, [groupId]);

  if (isLoading) {
    return <Spinner animation="border" />; // Show spinner while loading
  }

  if (error) {
    return <Alert variant="danger">Error fetching group details: {error.message}</Alert>; // Show error message
  }

  return (
    <Container className="marginS">
      <Card className="bg">
        <Card.Header as="h5">Member List</Card.Header>
        <Card.Body>
          <Card.Title>Number of Members: {groupMemberList.length}</Card.Title> {/* Fixed length usage */}
          {groupMemberList.length === 0 ? (
            <p>No members found.</p> // Handle empty list
          ) : (
            groupMemberList.map((member) => (
              <ProfileCard
                key={member._id}
                user={member}
                mode="view"
              />
            ))
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}
