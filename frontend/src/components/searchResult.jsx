import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { searchUsersAndGroups } from "../apis/search";
import { useState, useEffect } from "react";
import GroupCard from "./groupCardComponent";
import ProfileCard from "../components/profileCardComponent";
export default function SearchResults({ search }) {
  // code to get the filter data in backend
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userResult, setUserResult] = useState(false);
  const [groupResult, setGroupResult] = useState(false);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await searchUsersAndGroups();

        setSearchResult(response);
        if (response.user != []) {
          setUserResult(true);
        }
        if (response.group != []) {
          setGroupResult(true);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResult();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Display loading indicator
  }

  return (
    <>
      {/*Group Results*/}
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
            {/*GROUP LIST*/}
            {groupResult && (
              <div>
                {outputs.map((searchResult) => (
                  <GroupCard
                    key={searchResult.group._id}
                    group={searchResult.group}
                  />
                ))}
              </div>
            )}
          </ListGroup>
        </Card>
      </Card>

      {/*User Results*/}
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
            {/*USERS LIST*/}
            {userResult && (
              <div>
                {outputs.map((searchResult) => (
                  <ProfileCard
                    key={searchResult.user._id}
                    user={searchResult.user}
                    mode={"view"}
                  />
                ))}
              </div>
            )}
          </ListGroup>
        </Card>
      </Card>
    </>
  );
}
