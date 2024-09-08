import { getPublicFeed } from "../apis/posts"
import { useEffect, useState } from 'react';

import CreatePostHeaderComponent from "./createPostHeaderComponent";
import UserPostComponent from "./userPostComponent"

export default function Feed() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await getPublicFeed();

                setPosts(response);
            } catch (error) {
                console.error("Error fetching posts:", error);
                setError(error); // Set error state
            } finally {
                setIsLoading(false); // Set loading to false regardless of success or failure
            }
        };

        fetchPosts();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>; // Display loading indicator
    }

    return (
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