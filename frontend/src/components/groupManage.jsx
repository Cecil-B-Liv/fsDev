import { Card } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";

import JoinRequestList from "./joinRequestList";
import ManageUsersList from "./manageUserList";

export default function GroupMange(){
    return(
        <>
            {/*Join Requests*/}
            <Card className="mb-4">
                <Card.Header style={{textAlign:"center", fontWeight:"bold", fontSize:"1.5rem"}}>Join Requests</Card.Header>

                <Card 
                style={{
                    width: "100%",
                    maxHeight: "300px", // Set max height for the container
                    backgroundColor: "#f8f9fa",
                    overflowY: "auto", // Enable vertical scrolling 
                    }}>
                    <ListGroup>
                        <JoinRequestList/>
                    </ListGroup>
                </Card>
            </Card>

             {/*Manage Memebers*/}
             <Card className="mb-4">
                <Card.Header style={{textAlign:"center", fontWeight:"bold", fontSize:"1.5rem"}}>Manage Memebers</Card.Header>

                <Card 
                style={{
                    width: "100%",
                    maxHeight: "300px", // Set max height for the container
                    backgroundColor: "#f8f9fa",
                    overflowY: "auto", // Enable vertical scrolling 
                    }}>
                    <ListGroup>
                        <ManageUsersList/>
                    </ListGroup>
                </Card>
            </Card>
        </>
    );
}