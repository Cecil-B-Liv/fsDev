import React from "react";
import ManageUserCard from "./manageUserCard";
import { ListGroupItem } from "react-bootstrap";

export default function ManageUsersList() {
  const users = [
    {
      username: "JohnDoe",
      location: "New York, USA",
      imageSrc: "https://example.com/johndoe.jpg",
      initialStatus: "active",
    },
    {
      username: "JaneSmith",
      location: "London, UK",
      imageSrc: "https://example.com/janesmith.jpg",
      initialStatus: "suspended",
    },
    {
      username: "MikeRoss",
      location: "Toronto, Canada",
      imageSrc: "https://example.com/mikeross.jpg",
      initialStatus: "active",
    },
  ];

  return (
    <div>
      {users.map((user, index) => (
        <ListGroupItem>
          <ManageUserCard
          key={index}
          username={user.username}
          location={user.location}
          imageSrc={user.imageSrc}
          initialStatus={user.initialStatus}
        />
        </ListGroupItem>
      ))}
    </div>
  );
}
