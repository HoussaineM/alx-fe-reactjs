import React from "react";
import { useQuery } from "react-query";

const fetchPosts = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    return res.json();
}

export default function PostsComponent() {
     const { data, error, isLoading, isFetching, refetch, isPreviousData, isError } = useQuery('posts', fetchPosts, {
        cacheTime: 10 * 60 * 1000, 
        staleTime: 5 * 60 * 1000,  
        refetchOnWindowFocus: true, 
        keepPreviousData: true,    
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error#: {error.message}</div>;
    if (isError) {
        return <div>Error&: {error.message}</div>; 
    }

    return (
        <div>
            <h1>Posts</h1>
            <button onClick={() => refetch()}>Refetch Posts</button>
            {isFetching && <p>Updating...</p>} 
            <ul>
                {data.map(post => (
                    <li key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                    </li>
                ))}
            </ul>
            <button onClick={() => refetch()}>Refetch Posts</button>
            {isPreviousData && <p>Loading new data...</p>} 
        </div>
    );
}