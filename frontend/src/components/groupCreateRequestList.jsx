import GroupCreateRequestCard from "./groupCreateRequestCard";

export default function GroupCreateRequestList(){
    const testData = [
        {
          username: "John Doe",
          imageSrc: "https://example.com/avatar1.jpg",
          groupName: "React Developers",
        },
        {
          username: "Jane Smith",
          imageSrc: "https://example.com/avatar2.jpg",
          groupName: "UI/UX Designers",
        },
        {
          username: "Alex Johnson",
          imageSrc: "https://example.com/avatar3.jpg",
          groupName: "Full Stack Engineers",
        },
        {
          username: "Emily Davis",
          imageSrc: "https://example.com/avatar4.jpg",
          groupName: "Backend Wizards",
        },
        {
          username: "Michael Brown",
          imageSrc: "https://example.com/avatar5.jpg",
          groupName: "Frontend Masters",
        }
    ];

    return(
        <div>
            {testData.map((data, index) => (
                <GroupCreateRequestCard
                key={index}
                username={data.username}
                imageSrc={data.imageSrc}
                groupName={data.groupName}
                />
            ))}
        </div>
    )
}