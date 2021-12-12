import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import Flag from '../Flag'
import Hashtags from '../Hashtags'
import CommentsList from '../Comments/CommentsList'
import Modal from '../UIElements/Modal'
import GetDateAndTime from '../GetDateAndTime'
import modal_icon from '../../images/modal_icon.svg';
import GoogleAuth from '../Auth/GoogleAuth'
import { AuthContext } from '../Auth/auth-context';
import FacebookAuth from '../Auth/FacebookAuth'

import purple from '../../images/purple.svg';

export default function SinglePost() {
  const [post,setPost] = useState();
  const [author, setAuthor] = useState();
  const [hashtags, setHashtags] = useState();
  const [newComment, setNewComment] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [media, setMedia] = useState();
  // console.log('show login : ' + showLogin);




  const [isLoading, setIsLoading] = useState(false);
  const postId = useParams().pid;
  const auth = useContext(AuthContext);

  useEffect(() => {
    if(auth.isLoggedIn || JSON.parse(localStorage.getItem('userData'))){
    //   alert('user IN')
    // }
    // else{
      closeShowAuth();
    }
  }, [auth])

  
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


const [showAuth, setShowAuth] = useState(false);
    const openShowAuth = () => setShowAuth(true);
    const closeShowAuth = () => setShowAuth(false);

    // console.log();


    return (
      <React.Fragment>
        <Modal 
            show={showAuth} 
            onCancel={closeShowAuth} 
            // header='Auth' 
            contentClass='place-item__modal-content'
            footerClass='place-item_modal-actions'
            // footer={<button onClick={closeShowAuth}>CLOSE</button>}
        >
          <div class="b_modal mfp-hide zoom-anim-dialog" id="login">
            <div class="modal_wrapper">
              <button className='mfp-close' onClick={closeShowAuth}>X</button>
                <div class="modal_icon"><img src={ modal_icon } alt=""/></div>
                <div class="modal_content text_center">
                <div class="modal_title">Welcome to Newsrael!</div>
                <div class="content">In order to be able to comment on posts you must create a Newsrael account</div>
                </div>
                <div class="buttons_wrapper text_center">
                {/* <div class="btn_row"><a class="btn" href="#">
                    <div class="icon_wrapper"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 12.0237V11.9763C23.9872 5.3602 18.6191 0 12 0C5.42463 0 0.0838022 5.2896 0.000976562 11.8453V12.1547C0.0757636 18.0753 4.43746 22.9618 10.125 23.854V15.47H7.078V12H10.125V9.356C10.125 6.349 11.917 4.688 14.658 4.688C15.97 4.688 17.344 4.922 17.344 4.922V7.875H15.83C14.339 7.875 13.874 8.8 13.874 9.749V12H17.202L16.67 15.469H13.874V23.854C19.6044 22.9552 23.9884 18.0031 24 12.0237Z" fill="#1877F2"/><path fill-rule="evenodd" clip-rule="evenodd" d="M16.6711 15.4695L17.2031 12.0005H13.8751V9.74948C13.8751 8.80048 14.3401 7.87548 15.8311 7.87548H17.3441V4.92248C17.3441 4.92248 15.9701 4.68848 14.6581 4.68848C11.9171 4.68848 10.1251 6.34848 10.1251 9.35648V12.0005H7.07812V15.4695H10.1251V23.8545C11.3675 24.0495 12.6327 24.0495 13.8751 23.8545V15.4705H16.6711" fill="white"/></svg></div>
                    <div class="title">Sign in with Facebook</div></a></div> */}
                    <FacebookAuth/>
                {/* <div class="btn_row"><a class="btn" href="#">
                    <div class="icon_wrapper"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.204 3.86667C12.1201 3.86667 13.4126 4.67778 14.1496 5.35556L17.0294 2.6C15.2607 0.988889 12.9591 0 10.204 0C6.2131 0 2.76638 2.24444 1.08838 5.51111L4.3877 8.02222C5.21536 5.61111 7.50561 3.86667 10.204 3.86667Z" fill="#EA4335"/><path fill-rule="evenodd" clip-rule="evenodd" d="M20 10.2222C20 9.39996 19.932 8.79996 19.7846 8.17773H10.2041V11.8888H15.8277C15.7143 12.8111 15.1021 14.2 13.7415 15.1333L16.9615 17.5777C18.8889 15.8333 20 13.2666 20 10.2222Z" fill="#4285F4"/><path fill-rule="evenodd" clip-rule="evenodd" d="M4.39909 11.9774C4.17615 11.3408 4.06124 10.6727 4.05896 9.99963C4.05896 9.31074 4.18367 8.64408 4.38776 8.02185L1.08844 5.51074C0.373854 6.90355 0.0011399 8.44068 0 9.99963C0 11.6107 0.396825 13.133 1.08844 14.4885L4.39909 11.9774Z" fill="#FBBC05"/><path fill-rule="evenodd" clip-rule="evenodd" d="M10.2044 20.0007C12.9595 20.0007 15.2724 19.1118 16.9618 17.5785L13.7418 15.1341C12.8801 15.723 11.7237 16.1341 10.2044 16.1341C7.50599 16.1341 5.21574 14.3896 4.39942 11.9785L1.1001 14.4896C2.7781 17.7563 6.21348 20.0007 10.2044 20.0007Z" fill="#34A853"/></svg></div>
                    <div class="title">Sign in with Google</div></a></div> */}
                    <GoogleAuth/>
                </div>
            </div>
            </div>
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

        {!isLoading && post &&
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
                          <span class="writer_name">{post.author.name}</span>


                          <GetDateAndTime time={post.createdAt} />

                          </div>
                      </div>
                      <div class="post_content">
                        <div class="content">
                          <p>{post.content}</p>
                        </div>
                        <div class="post_image_wrapper">
                          <img src={post.media.length>0 ? post.media[0].url : 'https://foxrothschild.gjassets.com/content/uploads/2021/05/PUB_Israel_101051167-default-thumbnail-teaser-thumbnail-teaser-74859.jpg'} alt=""/>  
                        </div>
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
                      </div>

                    </div>
                  </div>
                  {/* <div class="comments_wrapper"> */}

                          
                            <CommentsList postId={postId} setShowAuth={setShowAuth} />
                            {/* <button onClick={() => setShowAuth(true)}>show login</button> */}
                                          

                  {/* </div> */}
                </div>
              </div>
              <div class="development"><span class="title">Website By </span><a class="link_logo" target="_blank" href="https://www.prpl.io/"><img src={purple} alt=""/></a></div>
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
