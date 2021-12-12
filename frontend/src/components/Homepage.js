import React from 'react'
import Flag from './Flag'
import Hashtags from './Hashtags'
import PostsList from './Posts/PostsList'
import InfiniteScroll from 'react-infinite-scroll-component';


export default function Homepage() {
    return (
        <div>
            {/* <div id="scrollableDiv" style={{ height: 800, overflow: "auto" }}> */}

            <div class="container">
            <div class="b_content flex">
                <Hashtags/>


                    <PostsList/>
        
                
                <Flag/>
            </div>
            </div>


            {/* </div> */}

        </div>
    )
}
