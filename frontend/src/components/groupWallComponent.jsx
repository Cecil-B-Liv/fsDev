import { Container, Image, Row, Col, Nav, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Outlet, Link, useParams } from "react-router-dom";

import { getGroup } from "../apis/group";
import { checkAuth } from "../apis/auth.js";
import { sendGroupJoinRequest } from "../apis/users.js";

export default function GroupWall() {
  const { groupId } = useParams(); // Get groupId from URL params
  const [userId, setUserId] = useState("");
  const assets = import.meta.env.VITE_SERVER_ASSETS;

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [groupDetails, setGroupDetails] = useState({});
  const [isMember, setIsMember] = useState(false);
  const [joinRequestSent, setJoinRequestSent] = useState(false);

  // FETCH GROUP DETAILS
  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const response = await getGroup(groupId);
        setGroupDetails(response);
      } catch (error) {
        console.error("Error fetching group details:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGroupDetails();
  }, [groupId]);

  // GET CURRENT USER ID
  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await checkAuth();
        const currentUser = response;
        setUserId(currentUser.userId);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error);
      }
    };

    getUserData();
  }, []);

  // Check if the current user is a member of the group once both groupDetails and userId are loaded
  useEffect(() => {
    if (groupDetails.groupMemberList && userId) {
      const memberCheck = groupDetails.groupMemberList.some(
        (member) => member._id === userId
      );
      setIsMember(memberCheck);
    }
  }, [groupDetails, userId]);

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

  // Check if the group is public or if the current user is a member
  const canViewContent = groupDetails.groupVisibility === "public" || isMember;

  // HANDLE JOIN REQUEST
  const handleJoinRequest = async () => {
    try {
      await sendGroupJoinRequest({ groupId });
      setJoinRequestSent(true); // Mark the request as sent
    } catch (error) {
      console.error("Error sending join request:", error);
    }
  };

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

      {/* Group Description */}
      <Row className="bg-primary text-white py-3">
        <Col>
          <h3 className="mb-0 text-center">
            {groupDetails.description
              ? `Group Description: ${groupDetails.description}`
              : "Group Description: Loading..."}
          </h3>
        </Col>

        {/* IS MEMBER BUTTON */}
        <Col className="text-center">
          {isMember ? (
            <Button
              variant="success"
              className="px-4 py-2"
              disabled
              style={{
                fontSize: "16px",
                cursor: "not-allowed",
              }}
            >
              ✔️ Member
            </Button>
          ) : joinRequestSent ? (
            <Button
              variant="secondary"
              className="px-4 py-2"
              disabled
              style={{
                fontSize: "16px",
              }}
            >
              Request Sent
            </Button>
          ) : (
            <Button
              variant="primary"
              className="px-4 py-2"
              style={{
                fontSize: "16px",
              }}
              onClick={handleJoinRequest}
            >
              Send Join Request
            </Button>
          )}
        </Col>
      </Row>

      {/* Conditional Rendering of Tabs */}
      <Row className="bg-light py-3">
        <Col className="d-flex justify-content-center">
          <Nav variant="pills">
            {/* Group Feeds - Only show if user is a member or group is public */}
            {canViewContent && (
              <>
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

                <Nav.Item>
                  <Nav.Link
                    as={Link}
                    to={`groupmembers`}
                    onClick={() => handleTabClick("members")}
                    className={
                      activeTab === "members"
                        ? "active text-white"
                        : "text-dark"
                    }
                    style={{
                      backgroundColor:
                        activeTab === "members"
                          ? "#f44336"
                          : "transparent",
                      borderRadius: "50px",
                      padding: "0.5rem 1.5rem",
                    }}
                  >
                    Members
                  </Nav.Link>
                </Nav.Item>

                {/* Group Manage - Show only if user is an admin */}
                {userId === groupDetails.groupAdminId?._id && (
                  <Nav.Item>
                    <Nav.Link
                      as={Link}
                      to={`groupmanage`}
                      onClick={() => handleTabClick("manage")}
                      className={
                        activeTab === "manage"
                          ? "active text-white"
                          : "text-dark"
                      }
                      style={{
                        backgroundColor:
                          activeTab === "manage"
                            ? "#f44336"
                            : "transparent",
                        borderRadius: "50px",
                        padding: "0.5rem 1.5rem",
                      }}
                    >
                      Manage Group
                    </Nav.Link>
                  </Nav.Item>
                )}
              </>
            )}
          </Nav>
        </Col>
      </Row>

      {/* Only render content if the user can view the group (public or member) */}
      <Row className="pt-4">
        <Col>
          {canViewContent ? (
            <Outlet />
          ) : (
            <p
              className="text-center"
              style={{
                fontSize: "1.5rem",
                color: "#721c24",
                fontWeight: "bold",
                padding: "20px",
                backgroundColor: "#f8d7da",
                borderRadius: "8px",
                border: "1px solid #f5c6cb",
                maxWidth: "600px",
                margin: "20px auto",
              }}
            >
              You do not have permission to view the content of this group.
            </p>
          )}
        </Col>
      </Row>
    </Container>
  );
}
