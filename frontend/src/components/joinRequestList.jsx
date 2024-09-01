import JoinRequestCard from "./joinRequestCard";

export default function JoinRequestList(){
    const testData = [
        {
          username: "John Doe",
          location: "New York, USA",
          imageSrc: "https://via.placeholder.com/50",
        },
        {
          username: "Jane Smith",
          location: "London, UK",
          imageSrc: "https://via.placeholder.com/50",
        },
        {
          username: "Carlos Ruiz",
          location: "Madrid, Spain",
          imageSrc: "https://via.placeholder.com/50",
        },
        {
          username: "Sakura Tanaka",
          location: "Tokyo, Japan",
          imageSrc: "https://via.placeholder.com/50",
        },
        {
          username: "Amir Hassan",
          location: "Cairo, Egypt",
          imageSrc: "https://via.placeholder.com/50",
        },
      ];
    return(
        <div>
            {testData.map((profile, index) => (
                <JoinRequestCard
                key={index}
                username={profile.username}
                location={profile.location}
                imageSrc={profile.imageSrc}
                />
            ))}
        </div>
    )
}