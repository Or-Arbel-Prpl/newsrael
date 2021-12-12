import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'

import PostItem from './PostItem'
import Flag from '../Flag'
import Hashtags from '../Hashtags'

export default function PostsList() {
    const [loadedPosts, setLoadedPosts] = useState();
    const [hashtag, setHashtag] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const hashtagSlag = useParams().hid;

    useEffect(() =>{
        const fetchData = async () => {
            setIsLoading(true);
            try {
                let response = await fetch(`http://localhost:5000/api/hashtags/${hashtagSlag}`);
                let responseData = await response.json();
                setHashtag(responseData.hashtag);                
            } catch (err) {
                console.log(err.message);
            }         
            setIsLoading(false);
        };
        fetchData();  
    }, []);

    useEffect(()=> {
    const fetchPosts = async (req, res, next) => {
        setIsLoading(true);
        let hashtagId = await hashtag._id;
        try {
            let response = await fetch(`http://localhost:5000/api/hashtags/${hashtagId}/posts`);
            let responseData = await response.json();
            setLoadedPosts(responseData.posts);            
        } catch (err) {
            console.log(err.message);
        }
        setIsLoading(false);
        
    }

    if (hashtag !== undefined) { fetchPosts() } ;
}, [hashtag])

    return (
        <div>
            <div class="container">
            <div class="b_content flex">
                <Hashtags/>

        <div class="b_main_content">
            <div class="main_content_wrapper"></div>

            {!isLoading && hashtag &&
            <div class="hashtag_page_title"># {hashtag.name}</div>
            }
            <div class="posts_list">
                
                {isLoading &&
                     <div class="post_card box_shadow" style={{height: '300px'}}>
                     </div>
                }

                {!isLoading && !loadedPosts && 
                <div class="custom_page_title" style={{textAlign: 'center', marginTop: '50px', color: '#0038b8', fontWeight: 700, fontSize: '18px' }}>
                We were not able to find this page.
                </div>
                // <p>No Posts for this hashtag.</p>
                }

                {!isLoading && loadedPosts &&
                loadedPosts.map((post) => <PostItem data={post} key={post.id} />)
                }
            </div>

        </div>

        <Flag/>
            </div>
            </div>



        </div>
    )
}
