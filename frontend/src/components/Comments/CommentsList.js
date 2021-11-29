import React, {useEffect, useState} from 'react'
import GetDateAndTime from '../GetDateAndTime';

export default function CommentsList(props) {
    // const comments = props.comments;
    const [comments, setComments] = useState(props.comments);
    const [isLoading, setIsLoading] = useState(false);
    const [showReport, setShowReport] = useState(false)
    const [newComment, setNewComment] = useState('');
    const postId = props.postId;


    const toggleShowReportWarning = (id) => {
        let comment = document.getElementById(id);
        comment.classList.toggle('open');
    }

    const fetchComments = async () => {
        setIsLoading(true);
        
            try {
                const response = await fetch(`http://localhost:5000/api/comments/post/${postId}`);
                const responseData = await response.json();
                setComments(responseData.comments);
            } catch (err) {
                console.log(err.message);
            }    
        
        setIsLoading(false);
      }


    useEffect(()=>{
        fetchComments();
    },[]);

    const isReported = (state, id) => {
        return  ( state === 'reported' ) ? 
        <div class="report_wrapper">
            <button class="toggle_report icon_report jsToggleReport" type="button"></button>
        </div>
        :
        <div class="report_wrapper">
            <button class="toggle_report jsToggleReport" type="button" onClick={() => {toggleShowReportWarning(id+'report')}}></button>
            <button id={id+'report'} class="report_btn" type="button" onClick={() => {reportHandler(id)}}>Report this comment as abusive</button>
        </div>
         ;
    }

    const reportHandler = async (commentId) => {
        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/api/comments/report/${commentId}`, {method: "PATCH"});
            const responseData = await response.json();
            console.log(responseData.updatedComment)
        } catch (err) {
            console.log(err.message);
        }
        setIsLoading(false);
        
        fetchComments();
        toggleShowReportWarning(commentId+'report');
    }
    
    const addNewComment = async (value) =>{
        if(value.str ===0){
            return;
        }

    try {
     await fetch(`http://localhost:5000/api/comments/`,{
      method: 'POST',
      body: JSON.stringify({author: 'test-author', content: value, postId: postId}),
      headers: {'Content-Type': 'application/json'}
    });
    
    } catch (err) {
        console.log(err.message);
    }

    setNewComment('');
    fetchComments();
}

    return (
        <div class="comments_wrapper">
        <div class="comments">
                      <div class="comments_list_wrapper jsCustomScrollbar">
                        <div class="comments_list">

                        {comments && comments.length > 0 &&
        comments.map((c,index) => 
        <div class="comment_row flex" key={c._id}>
                <div class="user_icon_wrapper">
                <div class="image_wrapper"><span class="writer_image bg_image"></span></div>
                </div>
                <div class="form_wrapper">
                <div class="comment_message">
                    <div class="comment_head_wrapper flex">
                    <div class="comment_head">
                        <span class="writer_name">{c.author}</span>
                        <GetDateAndTime time={c.date} />
                        </div>


                            {isReported(c.state, c._id)}


                    </div>
                    <div class="message">{c.content}</div>
                </div>
                </div>
            </div>          
        )
        }
        </div>
                      </div>
                    </div>

<div class="comments_form_wrapper flex">
<div class="user_icon_wrapper">
  <div class="image_wrapper"><span class="writer_image bg_image"></span></div>
</div>
<div class="form_wrapper"> 
  <div class="textarea_wrapper">
    <div class="char_wrapper"><span id="charNum">{newComment.length}</span>/193</div>
    <textarea 
        value={newComment} 
        onChange={(e)=> setNewComment(e.target.value)} 
        class="form_control" id="textarea_message" 
        placeholder="Write a comment..." 
        rows="6" 
        maxlength="193">
    </textarea>

    {/* <button class="btn btn_template" type="button" onClick={openShowAuth}>Comment</button> */}
    <button class="btn btn_template" type="button" onClick={ () => {addNewComment(newComment)}}>Comment</button>
  </div>
</div>
</div>
</div>
        
       
    )
}
