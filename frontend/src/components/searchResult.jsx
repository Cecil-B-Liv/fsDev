export default function SearchResults({input}){

    // code to get the filter data in backend
    return(
        <>
        {/*Group Results*/}
        <Card className="mb-4">
            <Card.Header style={{textAlign:"center", fontWeight:"bold", fontSize:"1.5rem"}}>Group Results</Card.Header>

            <Card 
            style={{
                width: "100%",
                maxHeight: "300px", // Set max height for the container
                backgroundColor: "#f8f9fa",
                overflowY: "auto", // Enable vertical scrolling 
                }}>
                <ListGroup>
                   {/*GROUP LIST*/}
                </ListGroup>
            </Card>
        </Card>

        {/*User Results*/}
        <Card className="mb-4">
            <Card.Header style={{textAlign:"center", fontWeight:"bold", fontSize:"1.5rem"}}>Users Results</Card.Header>

            <Card 
            style={{
                width: "100%",
                maxHeight: "300px", // Set max height for the container
                backgroundColor: "#f8f9fa",
                overflowY: "auto", // Enable vertical scrolling 
                }}>
                <ListGroup>
                    {/*USERS LIST*/}
                </ListGroup>
            </Card>
        </Card>
    </>
    );
}