import React from 'react'
import Flag from './Flag'
import Hashtags from './Hashtags'
import PostsList from './Posts/PostsList'


export default function Homepage() {
    return (
        <div>
            <div class="container">
            <div class="b_content flex">
                <Hashtags/>


                    <PostsList/>
        
                
                <Flag/>
            </div>
            </div>



        </div>
    )
}
