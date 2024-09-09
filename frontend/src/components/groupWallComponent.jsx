import { Container, Image, Row, Col, Nav } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Outlet, Link, useParams } from "react-router-dom";

import { getGroup } from "../apis/group";
import { checkAuth } from "../apis/auth.js";
import CreatePostGroupComponent from "./createPostGroupComponent"; // Import the new component

export default function GroupWall() {
  const { groupId } = useParams(); // Get groupId from URL params
  const [userId, setuserId] = useState("");
  const assets = import.meta.env.VITE_SERVER_ASSETS;

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [groupDetails, setGroupDetails] = useState({});

  // FETCH GROUP DETAILS
  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const response = await getGroup(groupId);
        setGroupDetails(response);
        console.log(response);
      } catch (error) {
        console.error("Error fetching group details:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGroupDetails();
  }, [groupId]);

  // GET CURRENT USER ID AFTER GET GROUP DETAILS
  useEffect(() => {
    const user = async () => {
      const response = await checkAuth();
      const currentUser = response;
      setuserId(currentUser.userId);
    };

    user();
  }, [groupDetails]);

  const [activeTab, setActiveTab] = useState("posts");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Container fluid className="p-0 m-0">
      {/* Group Image */}
      <Row>
        <Image
          src={`${assets}${groupDetails.groupBannerPath}`}
          fluid
          style={{ width: "100%", height: "20rem", objectFit: "cover" }}
          alt="Group Header"
        />
      </Row>

      {/* Owner Information */}
      <Row className="bg-danger text-white py-2">
        <Col>
          <h5 className="mb-0 text-center">
            {groupDetails.groupAdminId
              ? `Owner: ${groupDetails.groupAdminId.username}`
              : "Owner: Loading..."}
          </h5>
        </Col>
      </Row>

      {/* Group Name */}
      <Row className="bg-primary text-white py-3">
        <Col>
          <h3 className="mb-0 text-center">
            {groupDetails.name
              ? `Group Name: ${groupDetails.name}`
              : "Group Name: Loading..."}
          </h3>
        </Col>
      </Row>

      {/* Group Descriptions */}
      <Row className="bg-primary text-white py-3">
        <Col>
          <h3 className="mb-0 text-center">
            {groupDetails.name
              ? `Group Description: ${groupDetails.description}`
              : "Group Description: Loading..."}
          </h3>
        </Col>
      </Row>

      {/* Navigation Tabs */}
      <Row className="bg-light py-3">
        <Col className="d-flex justify-content-center">
          <Nav variant="pills">
            {/*GROUP FEEDS*/}
            <Nav.Item>
              <Nav.Link
                as={Link}
                to={`groupfeeds`}
                onClick={() => handleTabClick("posts")}
                className={
                  activeTab === "posts" ? "active text-white" : "text-dark"
                }
                style={{
                  backgroundColor:
                    activeTab === "posts" ? "#f44336" : "transparent",
                  borderRadius: "50px",
                  padding: "0.5rem 1.5rem",
                  marginRight: "0.5rem",
                }}
              >
                Posts
              </Nav.Link>
            </Nav.Item>

            {/*GROUP MEMBERS*/}
            <Nav.Item>
              <Nav.Link
                as={Link}
                to={`groupmembers`}
                onClick={() => handleTabClick("members")}
                className={
                  activeTab === "members" ? "active text-white" : "text-dark"
                }
                style={{
                  backgroundColor:
                    activeTab === "members" ? "#f44336" : "transparent",
                  borderRadius: "50px",
                  padding: "0.5rem 1.5rem",
                }}
              >
                Members
              </Nav.Link>
            </Nav.Item>

            {/*GROUP MANAGE - Check if current user is admin*/}
            {userId === groupDetails.groupAdminId?._id && (
              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to={`groupmanage`}
                  onClick={() => handleTabClick("manage")}
                  className={
                    activeTab === "manage" ? "active text-white" : "text-dark"
                  }
                  style={{
                    backgroundColor:
                      activeTab === "manage" ? "#f44336" : "transparent",
                    borderRadius: "50px",
                    padding: "0.5rem 1.5rem",
                  }}
                >
                  Manage Group
                </Nav.Link>
              </Nav.Item>
            )}
          </Nav>
        </Col>
      </Row>

      {/* Render the component based on the selected tab */}
      <Row className="pt-4">
        <Col>
          {/* Check if the 'posts' tab is active and render CreatePostGroupComponent
          {activeTab === "posts" && <CreatePostGroupComponent 
          groupId={groupId}
          />} */}
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}
