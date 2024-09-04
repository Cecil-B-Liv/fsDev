import GroupCreateRequestCard from "./groupCreateRequestCard";

export default function GroupCreateRequestList(){
  const groupRequests = [
    {
      username: "JohnDoe",
      imageSrc: "https://example.com/johndoe.jpg",
      groupName: "Nature Lovers",
      groupDescription: "A group for people who love nature and outdoor activities.",
      reasons: "We need a space to share our experiences and organize events."
    },
    {
      username: "JaneSmith",
      imageSrc: "https://example.com/janesmith.jpg",
      groupName: "Tech Innovators",
      groupDescription: "A group for discussing the latest trends in technology.",
      reasons: "We want to share innovative ideas and tech solutions."
    },
    {
      username: "MikeRoss",
      imageSrc: "https://example.com/mikeross.jpg",
      groupName: "Fitness Freaks",
      groupDescription: "A group dedicated to fitness enthusiasts.",
      reasons: "We aim to motivate each other to stay fit and healthy."
    }
  ];

    return(
      <div>
      {groupRequests.map((request, index) => (
        <GroupCreateRequestCard
          key={index}
          username={request.username}
          imageSrc={request.imageSrc}
          groupName={request.groupName}
          groupDescription={request.groupDescription}
          reasons={request.reasons}
        />
      ))}
    </div>
    )
}