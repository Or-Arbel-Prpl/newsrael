import React, { useEffect, useState } from 'react'
import '../../styles/main.css'
import {BrowserRouter as Link} from 'react-router-dom';
import Comments from '../Comments/CommentsList';
import GetDateAndTime from '../GetDateAndTime';

export default function PostItem(props) {
    const [author, setAuthor] = useState();
    const [comments, setComments] = useState();
    const [hashtags, setHashtags] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const post = props.data;
    const linkToSinglePost = `/post/${post.id}`;

    useEffect(() => {
        const fetchAuthorData = async () => {
            setIsLoading(true);

            //fetch author
            try {
                const response = await fetch(`http://localhost:5000/api/authors/${post.author}`);
                const responseData = await response.json();
                setAuthor(responseData.author);
            } catch (err) {
                console.log(err.message);
            }

            // fetch comments
            try {
                const response = await fetch(`http://localhost:5000/api/comments/post/${post.id}`);
                const responseData = await response.json();
                setComments(responseData.comments);
            } catch (err) {
                console.log(err.message);
            }
            
            // fetch hashtags
            try {
                const response = await fetch(`http://localhost:5000/api/hashtags/post/${post.id}`, );
                const responseData = await response.json();
                // console.log(responseData);
                setHashtags(responseData.hashtags);
            } catch (err) {
                console.log(err.message);
            }
            setIsLoading(false);
        }

        fetchAuthorData();
    }, [])

    // useEffect(() => {
    //     const fetchComments = async () => {
    //         setIsLoading(true);
    //         try {
    //             const response = await fetch(`http://localhost:5000/api/comments/post/${post.id}`);
    //             const responseData = await response.json();
    //             setComments(responseData.comments);
    //         } catch (err) {
    //             console.log(err.message);
    //         }
    //         setIsLoading(false);
    //     }
      
    //     fetchComments();
    //   }, [post]);

    //   useEffect(() => {
    //     const fetchHashtags = async () => {
    //         setIsLoading(true);
    //         try {
    //             const response = await fetch(`http://localhost:5000/api/hashtags/post/${post.id}`, );
    //             const responseData = await response.json();
    //             console.log(responseData);
    //             setHashtags(responseData.hashtags);
    //         } catch (err) {
    //             console.log(err.message);
    //         }
    //         setIsLoading(false);
    //     }
      
    //     fetchHashtags();
    //   }, [post]);
      

      

    return (
        <div>
            {isLoading &&
                <div class="post_card box_shadow" style={{height: '300px'}}>
                    {/* <div style={{textAlign: 'center'}}>Loading</div> */}
                </div>
            }

            {!isLoading && author && comments && hashtags &&
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
                        <span class="writer_name">{author.name}</span>
                        <GetDateAndTime time={post.createdAt} />
                        </div>
                </div>
                <div class="post_content">
                    <a class="content" href={linkToSinglePost}>
                        {post.content.slice(0,200)}
                        <span class="more">Read more...</span>   
                    </a>

                    <a class="post_image_wrapper" href={linkToSinglePost}>
                        <img src="images/post_image.jpg" alt=""/>
                    </a>
                    
                    <div class="image_source">Image Source: H Breaking news</div>
                </div>

                <div class="post_hashtag_list">
                    {hashtags.length === 0 && ''}
                    {hashtags.length > 0 && hashtags.map((h) => 
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
                            {comments.length ===0 && <span>Comment</span> }
                            {comments.length>0 && <span>{comments.length} Comments</span> }
                        </a>
                    </div>
                </div>
                </div>
            </div>

            }
        </div>
    )
}
