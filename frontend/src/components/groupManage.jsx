import { Card } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";

import MemberManageList from "./memberManageList";

export default function GroupMange(){
    return(
        <>
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
                        <MemberManageList/>
                    </ListGroup>
                </Card>
            </Card>
        </>
    );
}