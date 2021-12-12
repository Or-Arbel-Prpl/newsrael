const Comment = require('../models/comment');
const Post = require('../models/post');

const mongoose = require('mongoose');

const getAllComments = async (req, res, next) => {
    const comments = await Comment.find();

    if( !comments || comments.length === 0 ){
        const error = new Error('Could not find comments.');
        error.code = 404;
        return next(error);
    }
    res.json({ comments: comments.map(c => c.toObject({getters: true})) });
};

const getCommentsForPost = async (req, res, next) => {
    const postId = req.params.pid;
    let post;
    try {
        post = await Post.findById(postId);
    } catch (err) {
        const error = new Error('Something went wrong, please try again.');
        error.code = 500;
        return next(error);
    }

    if(!post){
        const error = new Error('Could not find a post for this  id.');
        error.code = 404;
        return next(error);
    }

    let comments = [];
    try {
        comments = await Comment.find({ inResponseToPostId: postId});
    } catch (err) {
        const error = new Error('Fetching comments failed, please try again.');
        error.code = 500;
        return next(error);
    }

    res.json({comments})

};

const addComment = async (req, res, next) => {
    const {author, content, postId, image } = req.body;

    //check if there is a post with that id
    let post;
    try {
        post = await Post.findById(postId);
        // console.log(post);
    } catch (err) {
        const error = new Error('Something went wrong, please try again.');
        error.code = 500;
        return next(error);
    }

    if(!post){
        const error = new Error('Could not find a post with the provided id.');
        error.code = 404;
        return next(error);
    }

    const createdComment = new Comment({
        author,
        content,
        inResponseToPostId: postId,
        date: new Date(),
        image: image || '',
        state: ''
    });

    console.log(createdComment);

    try {
        await createdComment.save();
    } catch (err) {
        const error = new Error('Creating comment failed, please try again.');
        error.code = 500;
        return next(error);
    }
    
    res.status(201).json({comment: createdComment});
};

const deleteCommentsByPostId = async (req, res, next) => {
    const postId = req.params.pid;
    
     //check if there is a post with that id
     let post;
     try {
         post = await Post.findById(postId);
     } catch (err) {
         const error = new Error('Something went wrong, please try again.');
         error.code = 500;
         return next(error);
     }
 
     if(!post){
         const error = new Error('Could not find a post with the provided id.');
         error.code = 404;
         return next(error);
     }

    try {
        await Comment.deleteMany({inResponseToPostId: postId});
        
    } catch (err) {
        const error = new Error('Could not delete comments, please try again.');
        error.code = 500;
        return next(error);
    }

    res.status(200).json({message: 'Comments deleted successfully.' });
    
};

const reportComment = async (req, res, next) =>{
    const commentId = req.params.cid;
    let comment;
    try {
        comment = await Comment.findById(commentId);
    } catch (err) {
        const error = new Error('Something went wrong, please try again.');
        error.code = 500;
        return next(error);
    }

    if(!comment){
        const error = new Error('Could not find a comment with the provided id.');
        error.code = 404;
        return next(error);
    }
    
    let updatedComment;

    try {
        let options = {new : true}
        updatedComment = await Comment.findByIdAndUpdate(commentId, {"state": "reported"}, options);
    } catch (err) {
        const error = new Error('Could not report, please try again.');
        error.code = 500;
        return next(error);
    }

    res.status(200).json({message: 'Comment has been reported successfully.', updatedComment});
     
}

module.exports = {
    getAllComments,
    getCommentsForPost,
    addComment,
    deleteCommentsByPostId,
    reportComment
}