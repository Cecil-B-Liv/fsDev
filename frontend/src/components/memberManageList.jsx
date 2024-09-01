import MemberManageCard from "./memberManageCard";

const memberTestData = [
    {
      username: "AliceJohnson",
      location: "New York, USA",
      imageSrc: "https://placehold.co/100x100",
    },
    {
      username: "BobSmith",
      location: "Los Angeles, USA",
      imageSrc: "https://placehold.co/100x100",
    },
    {
      username: "CharlieBrown",
      location: "Chicago, USA",
      imageSrc: "https://placehold.co/100x100",
    },
    {
      username: "DavidWilson",
      location: "Houston, USA",
      imageSrc: "https://placehold.co/100x100",
    },
    {
      username: "EvaGreen",
      location: "Miami, USA",
      imageSrc: "https://placehold.co/100x100",
    },
  ];

export default function MemberManageList(){
    return(
        <div>
            {memberTestData.map((profile, index) => (
                <MemberManageCard
                key={index}
                username={profile.username}
                location={profile.location}
                imageSrc={profile.imageSrc}
                />
            ))}
        </div>   
    )
}