import GroupCreateRequestCard from "./groupCreateRequestCard";
import { ListGroupItem } from "react-bootstrap";
import { useEffect, useState } from 'react';

import {getUnapprovedGroups} from "../apis/group";

export default function GroupCreateRequestList() {
  const [groupRequests, setGroupRequests] = useState([]);

  useEffect(() => {
    const fetchGroupRequests = async () => {
      try {
        const response = await getUnapprovedGroups(); // Call the API to fetch unapproved groups
        setGroupRequests(response); // Set the response data to state
      } catch (error) {
        console.error("Error fetching group requests:", error); // Error handling
      }
    };

    fetchGroupRequests(); // Call the function inside useEffect
  }, []); // Empty dependency array to run this only once on component mount

    return(
      <div>
      {groupRequests.map((request, index) => (
        <ListGroupItem>
          <GroupCreateRequestCard
          groupId = {request._id}
          username={request.groupAdminId.username}
          imageSrc={request.groupBannerPath}
          groupName={request.name}
          groupDescription={request.description}
          />
        </ListGroupItem>
      ))}
    </div>
    )
}