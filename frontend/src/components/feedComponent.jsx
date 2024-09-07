import CreatePostHeaderComponent from "./createPostHeaderComponent";
import UserPostComponent from "./userPostComponent"

import {getFeedPosts} from "../apis/posts"
import { useEffect, useState } from 'react';  //test

export default function Feed(){
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getPosts = async () => {
            try {
                const response = await getFeedPosts();
                
                // Ensure the response is an array
                if (Array.isArray(response)) {
                    setPosts(response);
                } else {
                    console.error("API did not return an array");
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        getPosts();
    }, []);

    return(
        <>
            <CreatePostHeaderComponent />

            <div>
                {posts.map((post) => (
                    <UserPostComponent key={post._id} post={post} />
                ))}
            </div>
        </>
    );
}