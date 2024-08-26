import CreatePostHeaderComponent from "./createPostHeaderComponent";
import UserPostComponent from "./userPostComponent"

export default function Feed(){
    return(
        <>
            <CreatePostHeaderComponent />
            <UserPostComponent />
            <UserPostComponent />
            <UserPostComponent />
        </>
    );
}