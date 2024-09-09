import MemberManageCard from "./memberManageCard";

import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { Alert } from "react-bootstrap";

import { getGroup } from "../apis/group";

export default function MemberManageList(){
  const {groupId} = useParams();
  const [memberList, setMemberList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [groupDetails, setGroupDetails] = useState({});

  // FETCH GROUP DETAILS
  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const response = await getGroup(groupId);
        setGroupDetails(response);
        setMemberList(response.groupMemberList || []); // Ensure we set an array
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

    return(
        <div>
            {memberList.map((member, index) => (
                <MemberManageCard
                key={member._id}
                member={member}
                />
            ))}
        </div>   
    )
}