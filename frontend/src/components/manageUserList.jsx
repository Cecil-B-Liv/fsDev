import ManageUserCard from "./manageUserCard";
import { ListGroupItem } from "react-bootstrap";
import { useEffect, useState } from 'react';
import {getUsers} from "../apis/users"

export default function ManageUsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUserList = async () => {
      try {
        const response = await getUsers(); // Call the API to fetch users
        setUsers(response); // Update state with the users
        console.log("Users fetched:", response); // Debugging log
      } catch (error) {
        console.error("Error fetching user list:", error); // Log the error
      }
    };

    getUserList(); // Invoke the fetch function on mount
  }, []); // Empty dependency array to run on component mount

  return (
    <div>
      {users.map((user, index) => (
        // Moved the `key` to the outermost component
        <ListGroupItem key={index}>
          <ManageUserCard
            username={user.username}
            location={user.location}
            imageSrc={user.imageSrc}
            initialStatus={user.isSuspended}
          />
        </ListGroupItem>
      ))}
    </div>
  );
}