import React, { useEffect, useState, useRef, useCallback } from 'react'
import PostItem from './PostItem';
// import LazyLoad from 'react-lazyload';
import InfiniteScroll from 'react-infinite-scroll-component';


// import axios from 'axios';


export default function PostsList() {
    const [loadedPosts, setLoadedPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [page,setPage] = useState(2);

    // console.log('has more ? ' + hasMore + ', page : ' + page);
    
    useEffect(() => {
        const getFirstPosts = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`http://localhost:5000/api/posts?page=1`);
                const responseData = await response.json();
                // setLoadedPosts([...loadedPosts, ...responseData.posts]);
                // setHasMore(responseData.hasMore);
                setLoadedPosts(responseData.posts);
                
            } catch (err) {
                console.log(err.message);
            }
            setIsLoading(false);
        };
        getFirstPosts();  
}, []);

    const fetchMorePosts = async () => {
                try {
                    // setIsLoading(true);
                    const response = await fetch(`http://localhost:5000/api/posts?page=${page}`);
                    const responseData = await response.json();
                    // setLoadedPosts([...loadedPosts, ...responseData.posts]);
                    // setHasMore(responseData.hasMore);
                    return responseData.posts;
                    
                } catch (err) {
                    console.log(err.message);
                }
            };

    const fetchData = async () => {
        const newPosts = await fetchMorePosts();
    
        setLoadedPosts([...loadedPosts, ...newPosts]);
        if (newPosts.length === 0 || newPosts.length < 3) {
          setHasMore(false);
        }
        setPage(page + 1);
      };


    return (
        <div class="b_main_content">
            <div class="main_content_wrapper"></div>
            <div class="posts_list">

                {isLoading &&
                     <div class="post_card box_shadow" style={{height: '300px'}}>
                     </div>
                }

                 {!isLoading && loadedPosts.length>0 &&
                <div id="scrollableDiv" style={{ height: 800, overflow: "auto" }}>
                        <InfiniteScroll
                            dataLength={loadedPosts.length}
                            next={fetchData}
                            hasMore={hasMore}
                            loader={<h4>Loading...</h4>}
                            endMessage={<h4 style={{textAlign: 'center'}}>There are no more posts to show</h4>}
                            scrollableTarget="scrollableDiv"
                        >
                           
                           {!isLoading && loadedPosts.length>0 &&
                            loadedPosts.map((post) => 
                                <PostItem key={post.id} data={post} />
                            )} 
                            hi 

                        </InfiniteScroll>
                        </div>
                }

                {/* {!isLoading && loadedPosts.length>0 &&
                loadedPosts.map((post) => 
                      <PostItem key={post.id} data={post} />
                )}   */}

            </div>

        </div>
    )
}
