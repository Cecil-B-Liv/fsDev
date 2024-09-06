import { Card } from "react-bootstrap"
import { ListGroup } from "react-bootstrap"

import GroupCreateRequestList from "./groupCreateRequestList"
import ManageUsersList from "./manageUserList"

export default function SiteAdminDashBoard(){
    return(
        <>
            {/*Group Requests*/}
            <Card className="mb-4">
                <Card.Header style={{textAlign:"center", fontWeight:"bold", fontSize:"1.5rem"}}>Group Create Requests</Card.Header>

                <Card 
                style={{
                    width: "100%",
                    maxHeight: "300px", // Set max height for the container
                    backgroundColor: "#f8f9fa",
                    overflowY: "auto", // Enable vertical scrolling 
                    }}>
                    <ListGroup>
                        <GroupCreateRequestList/>
                    </ListGroup>
                </Card>
            </Card>

            {/*User Manage*/}
            <Card className="mb-4">
                <Card.Header style={{textAlign:"center", fontWeight:"bold", fontSize:"1.5rem"}}>Manage Users</Card.Header>

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
    )
}