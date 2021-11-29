const Post = require('../models/post');
const Author = require('../models/author');
const Comment = require('../models/comment');
const mongoose = require('mongoose');
const hashtag = require('../models/hashtag');


const getAllPosts = async (req, res, next) => {
    const posts = await Post.find();
    // console.log(posts);

    if( !posts || posts.length === 0 ){
        const error = new Error('Could not find posts.');
        error.code = 404;
        return next(error);
    }
    res.json({ posts: posts.map(post => post.toObject({getters: true})) });
    // res.json({ posts });
}

const getPostById = async (req, res, next) => {
    const postId = req.params.pid;

    let post;
    try {
        post = await Post.findById(postId);
    } catch (err) {
        const error = new Error('Something went wrong, could not find a post.');
        error.code = 500;
        return next(error); 
    }

    if(!post){
        const error = new Error('Could not find a post for the provided id.');
        error.code = 404;
        return next(error);
    }
    res.json({post: post.toObject({getters: true})}); //from json to normal js object with id key
};

const getPostsByAuthorId = async (req, res, next) => {
    const authorId = req.params.aid;
    let posts;
    try {
        posts = await Post.find({ author: authorId});
    } catch (err) {
        const error = new Error('Fetching posts failed, please try again.');
        error.code = 500;
        return next(error); 
    }

    if( !posts || posts.length === 0 ){
        const error = new Error('Could not find posts for the provided author.');
        error.code = 404;
        return next(error);
    }
    res.json({posts});
};

const getPostsByHashtagId = async (req, res, next) => {
    const hashtagId = req.params.hid;

    // res.send(hashtagId);
    let posts;
    try {
        posts = await Post.find({ hashtags: hashtagId });
        // posts = await Post.find({
        //     hashtags: { $in: ['61a3814281b86bd3e5b15855'] }
        // });

        // posts = await Post.find({ hashtags: { $elemMatch : hashtagId } });

    } catch (err) {
        const error = new Error('Fetching posts failed, please try again.');
        error.code = 500;
        return next(error); 
    }

    res.json({posts: posts.map(post => post.toObject({getters: true})) });
};

const getPostsByDate = async (req, res, next) => {
    const date = req.params.date;
    
    let posts;
    try {
        posts = await Post.find({ createdAt: date });
    } catch (err) {
        const error = new Error('Fetching posts failed, please try again.');
        error.code = 500;
        return next(error); 
    }

    if( !posts || posts.length === 0 ){
        const error = new Error('Could not find posts from the provided date.');
        error.code = 404;
        return next(error);
    }

    res.json({posts});
};

const createPost = async (req, res, next) => {
    const { title, content, hashtags, author, category } = req.body;
    //missing id

    const createdPost = new Post({
        title,
        content,
        hashtags,
        author,
        category,
        createdAt: new Date(),
        updatedAt: new Date(),
        media:''
    });

    // check if that author exists
    let creator;
    try {
        creator = await Author.findById(author);
    } catch (err) {
        const error = new Error('Creating post failed, please try again.');
        error.code = 500;
        return next(error);
    }

    if(!creator){
        const error = new Error('Could not find author for provided id.');
        error.code = 404;
        return next(error);
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdPost.save({ session: sess });
        creator.posts.push(createdPost);
        await creator.save({ session: sess });
        sess.commitTransaction();

    } catch (err) {
        const error = new Error('Creating post failed, please try again.');
        error.code = 500;
        return next(error);
    }

res.status(201).json({post: createdPost});

};

const updatePost = async (req, res, next) => {
    const postId = req.params.pid;
    const { title, content, hashtags, author, category } = req.body;

    let post;
    try {
        post = await Post.findById(postId);
    } catch (err) {
        const error = new Error('Something went wrong, could not update post.');
        error.code = 500;
        return next(error);
    }

    post.title = title;
    post.content = content;
    post.hashtags = hashtags;
    post.author = author;
    post.category = category;
    post.updatedAt = new Date();

    try {
        await post.save();
    } catch (err) {
        const error = new Error('Something went wrong, could not update post.');
        error.code = 500;
        return next(error);
    }

    res.status(200).json({post : post.toObject({getters : true}) }) ;
};

const deletePost = async (req, res, next) => {
    const postId = req.params.pid;

    let postToDelete;
    try {
        postToDelete = await Post.findById(postId).populate('author');
    } catch (err) {
        const error = new Error('Something went wrong, could not delete post.');
        error.code = 500;
        return next(error);
    }

    if(!postToDelete){
        const error = new Error('Could not find a post for this  id.');
        error.code = 404;
        return next(error);
    }

    try {

        const sess = await mongoose.startSession();
        sess.startTransaction();
        await postToDelete.remove({ session: sess });
        postToDelete.author.posts.pull(postToDelete);
        await postToDelete.author.save({ session: sess });
        await sess.commitTransaction();

    } catch (err) {
        const error = new Error('Something went wrong, could not delete post.');
        error.code = 500;
        return next(error);
    }

    // try {
    //     await fetch(`http://localhost:5000/api/comments/post/${postId}`,{method: 'DELETE'});
        
    // } catch (err) {
    //     const error = new Error('could not delete comments.');
    //     error.code = 500;
    //     return next(error);
    // }

        //delete comments for the specific post ... not working yet
    // try {
    //     await Comment.filter( c => c.inResponseToPostId !== postId );
    //     await Comment.save();

    // } catch (err) {
    //     const error = new Error('could not delete the comments with that post id.');
    //     error.code = 500;
    //     return next(error);
    // }

    res.status(200).json({message: 'Post deleted successfully.' });
};

module.exports = {
    getAllPosts,
    getPostById,
    getPostsByAuthorId,
    getPostsByHashtagId,
    getPostsByDate,
    createPost,
    updatePost,
    deletePost
}