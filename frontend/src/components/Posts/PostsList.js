import React, { useEffect, useState } from 'react'
import PostItem from './PostItem'
import SinglePost from './SinglePost'

export default function PostsList() {
    const [loadedPosts, setLoadedPosts] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() =>{
        const fetchPosts = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('http://localhost:5000/api/posts');
                const responseData = await response.json();
                setLoadedPosts(responseData.posts);
                
            } catch (err) {
                console.log(err.message);
            }
            setIsLoading(false);
        };
        fetchPosts();  
    }, []);


    return (
        <div class="b_main_content">
            <div class="main_content_wrapper"></div>

            <div class="posts_list">
                {isLoading &&
                     <div class="post_card box_shadow" style={{height: '300px'}}>
                     </div>
                }

                {!isLoading && loadedPosts &&
                loadedPosts.map((post) => <PostItem data={post} />)
                }
            </div>

        </div>
    )
}
