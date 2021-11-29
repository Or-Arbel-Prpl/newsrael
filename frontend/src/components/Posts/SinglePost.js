import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Flag from '../Flag'
import Hashtags from '../Hashtags'
import CommentsList from '../Comments/CommentsList'
import Modal from '../UIElements/Modal'
import GetDateAndTime from '../GetDateAndTime'

export default function SinglePost() {
  const [post,setPost] = useState();
  const [author, setAuthor] = useState();
  const [hashtags, setHashtags] = useState();
  const [newComment, setNewComment] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const postId = useParams().pid;
  
  useEffect(() => {
    const fetchPostData = async () => {
      setIsLoading(true);
      try {
          const response = await fetch(`http://localhost:5000/api/posts/${postId}`);
          const responseData = await response.json();
          setPost(responseData.post);
      } catch (err) {
          console.log(err.message);
      }
      setIsLoading(false);
  }
  fetchPostData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
        setIsLoading(true);
        // fetch author
        try {
            const response = await fetch(`http://localhost:5000/api/authors/${post.author}`);
            const responseData = await response.json();
            setAuthor(responseData.author);
        } catch (err) {
            console.log(err.message);
        }

        //fetch hashtags
        try {
          const response = await fetch(`http://localhost:5000/api/hashtags/post/${post.id}`, );
          const responseData = await response.json();
          console.log(responseData);
          setHashtags(responseData.hashtags);
      } catch (err) {
          console.log(err.message);
      }
        setIsLoading(false);
    }

    fetchData();
}, [post]);

// useEffect(() => {
//   const fetchHashtags = async () => {
//       setIsLoading(true);
//       try {
//           const response = await fetch(`http://localhost:5000/api/hashtags/post/${post.id}`, );
//           const responseData = await response.json();
//           console.log(responseData);
//           setHashtags(responseData.hashtags);
//       } catch (err) {
//           console.log(err.message);
//       }
//       setIsLoading(false);
//   }

//   fetchHashtags();
// }, [post]);


const [showAuth, setShowAuth] = useState(false);
    const openShowAuth = () => setShowAuth(true);
    const closeShowAuth = () => setShowAuth(false);


    return (
      <React.Fragment>
        <Modal 
            show={showAuth} 
            onCancel={closeShowAuth} 
            // header='Auth' 
            contentClass='place-item__modal-content'
            footerClass='place-item_modal-actions'
            footer={<button onClick={closeShowAuth}>CLOSE</button>}
        >
          <h2>Welcome to Newsrael!</h2>
            <p>Please sign in</p>
        </Modal>  
        <div>
            <div class="container">
            <div class="b_content flex">
                <Hashtags/>

        {isLoading && 
          <div class="b_main_content" >
            <div class="main_content_wrapper">
              <div class="b_single_post">
                <div class="post_card box_shadow" style={{height: '300px'}}></div>
              </div>
            </div>
          </div>
}

        {!isLoading && post && author && hashtags &&
        <div class="b_main_content">
            <div class="main_content_wrapper">
              <div class="b_single_post">
                <div class="posts_list">
                  <div class="post_card box_shadow">
                    <div class="category_wrapper">
                      <div class="category dib blue">{post.category}</div>
                    </div>
                    <div class="post_container">
                      <div class="post_header">
                        <div class="writer_wrapper flex">
                          <div class="writer_image_wrapper">
                            <div class="image_wrapper"><span class="name_letters">JD</span><span class="writer_image"> </span></div>
                          </div>
                          <div class="post_title">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                        </div>
                        <div class="post_information">
                          <span class="writer_name">{author.name}</span>


                          <GetDateAndTime time={post.createdAt} />

                          </div>
                      </div>
                      <div class="post_content">
                        <div class="content">
                          <p>{post.content}</p>
                        </div>
                        <div class="post_image_wrapper"><img src="images/post_image.jpg" alt=""/></div>
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
                      </div>
                    </div>
                  </div>
                  {/* <div class="comments_wrapper"> */}

                          
                            <CommentsList postId={postId} />
                          


                    

                  {/* </div> */}
                </div>
              </div>
              <div class="development"><span class="title">Website By </span><a class="link_logo" href="#"><img src="images/purple.svg" alt=""/></a></div>
            </div>
          </div>
          }

        
          <Flag/>

          </div>
            </div>



        </div>
        </React.Fragment>
    )
}
