import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { searchUsersAndGroups } from "../apis/search";
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import GroupCard from "./groupCardComponent";
import ProfileCard from "../components/profileCardComponent";

export default function SearchResults() {
  const [searchResult, setSearchResult] = useState({ user: [], group: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userResult, setUserResult] = useState(false);
  const [groupResult, setGroupResult] = useState(false);

  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await searchUsersAndGroups(query);

        // Ensure response has user and group arrays, default to empty arrays if undefined
        const users = response.user || [];
        const groups = response.group || [];

        if (users.length > 0) {
          setUserResult(true);
        }
        if (groups.length > 0) {
          setGroupResult(true);
        }

        // Set search results
        setSearchResult({ user: users, group: groups });
      } catch (error) {
        console.error("Error fetching search results:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResult();
  }, [query]);

  if (isLoading) {
    return <div>Loading...</div>; // Display loading indicator
  }

  if (error) {
    return <div>Error loading search results</div>;
  }

  return (
    <>
      {/* Group Results */}
      <Card className="mb-4">
        <Card.Header
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "1.5rem",
          }}
        >
          Group Results
        </Card.Header>

        <Card
          style={{
            width: "100%",
            maxHeight: "300px", // Set max height for the container
            backgroundColor: "#f8f9fa",
            overflowY: "auto", // Enable vertical scrolling
          }}
        >
          <ListGroup>
            {groupResult && (
              <>
                {searchResult.group.map((group) => (
                  <GroupCard key={group._id} group={group} />
                ))}
              </>
            )}
          </ListGroup>
        </Card>
      </Card>

      {/* User Results */}
      <Card className="mb-4">
        <Card.Header
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "1.5rem",
          }}
        >
          Users Results
        </Card.Header>

        <Card
          style={{
            width: "100%",
            maxHeight: "300px", // Set max height for the container
            backgroundColor: "#f8f9fa",
            overflowY: "auto", // Enable vertical scrolling
          }}
        >
          <ListGroup>
            {userResult && (
              <>
                {searchResult.user.map((user) => (
                  <ProfileCard key={user._id} user={user} mode={"view"} />
                ))}
              </>
            )}
          </ListGroup>
        </Card>
      </Card>
    </>
  );
}