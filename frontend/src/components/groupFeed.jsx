import { Container, Card, Spinner, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getGroup } from "../apis/group";

import UserPostComponent from "./userPostComponent"
import CreatePostGroupComponent from "./createPostGroupComponent";

export default function GroupFeed() {
  const { groupId } = useParams(); // Get groupId from URL params
  const assets = import.meta.env.VITE_SERVER_ASSETS;

  const [groupFeed, setGroupFeed] = useState([]); // Holds the group feed posts
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [groupDetails, setGroupDetails] = useState({});

  // FETCH GROUP DETAILS
  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const response = await getGroup(groupId);
        setGroupDetails(response);
        setGroupFeed(response.posts || []); // Ensure we set an array
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
    <>
      <div>
        <CreatePostGroupComponent groupId={groupId}/>
        {groupFeed.map((post) => (
          <UserPostComponent key={post._id} post={post} />
        ))}
      </div>
    </>
  );
}
