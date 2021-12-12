import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function Hashtags() {
const [hashtags, setHashtags] = useState([]);


  useEffect(() =>{
    const getAllHashtags = async () => {
      try {
          // setIsLoading(true);
          const response = await fetch(`http://localhost:5000/api/hashtags`);
          // console.log(response);
          const responseData = await response.json();
          // console.log(responseData);
          setHashtags(responseData.hashtags)
          
      } catch (err) {
          console.log(err.message);
      }
  };

  getAllHashtags();

  },[]);

  const currentHashtag = useParams().hid;
  useEffect(() => {
    if(hashtags.length>0 && currentHashtag){
      console.log(hashtags);
      console.log(currentHashtag);

      document.getElementById(currentHashtag).classList.add('active');
    }
  },[hashtags])

    return (
        <div class="b_sidebar_wrapper">
            <div class="hashtags_wrapper">
              <div class="hashtag_label"><a href="hashtag_archive.html">Hashtags</a></div>
              <div class="hashtags_list jsCustomScrollbar">
                <ul>
                  {/* <li class="active"><a href="#"># Israeli Nature</a>
                    <div class="posts_counter"><span>16</span> Posts</div>
                  </li>
                  <li><a href="#"># Netanyahu</a>
                    <div class="posts_counter"><span>16</span> Posts</div>
                  </li>
                  <li><a href="#"># Israeli Photography</a>
                    <div class="posts_counter"><span>16</span> Posts</div>
                  </li>
                  <li><a href="#"># CoronaVirus</a>
                    <div class="posts_counter"><span>16</span> Posts</div>
                  </li>
                  <li><a href="#"># Netanyahu</a>
                    <div class="posts_counter"><span>16</span> Posts</div>
                  </li> */}
                  {hashtags && hashtags.map((h) =>
                  
                    <li id={h.slag}><a href={`/hashtags/` + h.slag} ># {h.name}</a>
                      <div class="posts_counter"><span>{h.postsCount}</span> Posts</div>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
    )
}
