import React from "react";
import ManageUserCard from "./manageUserCard";

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
        <ManageUserCard
          key={index}
          username={user.username}
          location={user.location}
          imageSrc={user.imageSrc}
          initialStatus={user.initialStatus}
        />
      ))}
    </div>
  );
}
