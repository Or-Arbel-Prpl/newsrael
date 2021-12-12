import React, { useEffect, useState } from 'react'
import '../../styles/main.css'
import {BrowserRouter as Link} from 'react-router-dom';
import Comments from '../Comments/CommentsList';
import GetDateAndTime from '../GetDateAndTime';

export default function PostItem(props) {
    const [author, setAuthor] = useState();
    const [comments, setComments] = useState();
    const [hashtags, setHashtags] = useState();
    const [media, setMedia] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const post = props.data;
    const linkToSinglePost = `/post/${post.id}`;

    return (
        <div>
            {isLoading &&
                <div class="post_card box_shadow" style={{height: '300px'}}>
                    {/* <div style={{textAlign: 'center'}}>Loading</div> */}
                </div>
            }

            {!isLoading && 
                <div class="post_card box_shadow">
                <div class="category_wrapper">
                <div class="category dib blue">{post.category}</div>
                </div>
                <div class="post_container">
                <div class="post_header">
                    <div class="writer_wrapper flex">
                    <div class="writer_image_wrapper">
                        <div class="image_wrapper"><span class="name_letters">JD</span><span class="writer_image bg_image"></span></div>
                    </div>
                    <div class="post_title">{post.title}</div>
                    </div>
                    <div class="post_information">
                        <span class="writer_name">{post.author.name}</span>
                        <GetDateAndTime time={post.createdAt} />
                        </div>
                </div>
                <div class="post_content">
                    <a class="content" href={linkToSinglePost}>
                        {post.content.slice(0,200)}
                        <span class="more">Read more...</span>   
                    </a>

                    <a class="post_image_wrapper" href={linkToSinglePost}>
                        {/* <img src='https://foxrothschild.gjassets.com/content/uploads/2021/05/PUB_Israel_101051167-default-thumbnail-teaser-thumbnail-teaser-74859.jpg' alt=""/> */}
                        <img src={post.media.length>0 ? post.media[0].url : 'https://foxrothschild.gjassets.com/content/uploads/2021/05/PUB_Israel_101051167-default-thumbnail-teaser-thumbnail-teaser-74859.jpg'} alt=""/>  
                    </a>
                    
                    {/* <div class="image_source">Image Source: H Breaking news</div> */}
                </div>

                <div class="post_hashtag_list">
                    {post.hashtags.length === 0 && ''}
                    {post.hashtags.length > 0 && post.hashtags.map((h) => 
                    <a href={'/hashtags/' + h.slag}># {h.name}</a>
                    )}
                </div>

                <div class="post_footer flex">
                    <div class="social_wrapper">
                    <div class="share">
                        <button class="btn btn_template btn_share" type="button">Share</button>
                    </div>
                    <div class="social_list"><a class="social_link social_facebook" href="#"></a><a class="social_link social_whatsapp" href="#"></a><a class="social_link social_twitter" href="#"></a><a class="social_link social_mail" href="#"></a></div>
                    </div>

                    <div class="comments_wrapper">
                        <a class="comments_count dib" href={linkToSinglePost}>
                            {post.comments.length === 0 && <span>Comment</span> }
                            {post.comments.length > 0 && <span>{ post.comments.length } Comments</span> }
                        </a>
                    </div>
                </div>
                </div>
            </div>

            }


        </div>
    )
}
