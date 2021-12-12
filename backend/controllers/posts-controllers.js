const Post = require('../models/post');
const Author = require('../models/author');
const Comment = require('../models/comment');
const mongoose = require('mongoose');
const Hashtag = require('../models/hashtag');
const Media = require('../models/media');


const getAllPosts = async (req, res, next) => {
  let posts;
  let query = Post.find();
  let page;
  let pages;
  let limit;
  let hasMore;

  let author, files;
  let comments = [];
  let hashtags = [];
  
    try{
        page = parseInt(req.query.page) || 1;
        limit = parseInt(req.query.limit) || 3; //pageSize , how much posts in each page

        // const startIndex = ( req.query.skip );
        const startIndex = ( page - 1 ) * limit; //skip
        // const endIndex = page * limit;
        const total = await Post.countDocuments();
        pages = Math.ceil(total / limit);

        hasMore =  (pages>page) ? true : false ;

        // posts = await Post.find();
        query = query.skip(startIndex).limit(limit).exec();
        posts = await query;
    }
    catch(err){
        const error = new Error('Something went wrong, could not fetch posts.');
        error.code = 500;
        return next(error); 
    }

    if( !posts || posts.length === 0 ){
        const error = new Error('Could not find posts.');
        error.code = 404;
        return next(error);
    }

    let result = []; //json variable for the response

    function done(result) {
      res.json({
        posts: result.map(post => post.toObject({getters: true})), hasMore, pages
      });
    }

    for(let i=0; i<posts.length ; i++ ){
        let post = posts[i];
        try {
            author = await Author.findById(post.author, '-posts');
            post.author = author;
            comments = await Comment.find({ inResponseToPostId: post.id});
            post.comments = comments; 
            hashtags = await Hashtag.find().where('_id').in(post.hashtags).exec();
            post.hashtags = hashtags;
            files = await Media.find({ postId: post.id});
            post.media = files;
            
        } catch (error) {
            error = new Error('Something went wrong, please try again.');
            error.code = 500;
            return next(error);
        }
        result.push(post);
        if(i+1 === posts.length){
            done(result);
        }
    }

// const getPostById = async (req, res, next) => {
//     const postId = req.params.pid;

//     let post;
//     try {
//         post = await Post.findById(postId);
//     } catch (err) {
//         const error = new Error('Something went wrong, could not find a post.');
//         error.code = 500;
//         return next(error);
//     }

//     if(!post){
//         const error = new Error('Could not find a post for the provided id.');
//         error.code = 404;
//         return next(error);
//     }


//     res.json({post: post.toObject({getters: true})}); //from json to normal js object with id key
// };

// get posts with full data: author, comments, hashtags and media
const getPostById = async (req, res, next) => {
    const postId = req.params.pid;

    let post, author, files;
    let comments = [];
    let hashtags = [];
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

    try {
        author = await Author.findById(post.author, '-posts');
        comments = await Comment.find({ inResponseToPostId: post.id});
        hashtags = await Hashtag.find().where('_id').in(post.hashtags).exec();
        files = await Media.find({ postId: postId});
        
    } catch (error) {
        error = new Error('Something went wrong, please try again.');
        error.code = 500;
        return next(error);
    }

    // console.log(files);
    post.hashtags = hashtags;
    post.media = files;
    post.author = author;
    post.comments = comments;
    

    post = post.toObject({getters: true});



    res.json({post}); //from json to normal js object with id key
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

// const getPostsByHashtagId = async (req, res, next) => {
//     const hashtagId = req.params.hid;

//     let posts;
//     try {
//         posts = await Post.find({ hashtags: hashtagId });
//     } catch (err) {
//         const error = new Error('Fetching posts failed, please try again.');
//         error.code = 500;
//         return next(error); 
//     }

//     res.json({posts: posts.map(post => post.toObject({getters: true})) });
// };

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
    // getPostsByHashtagId,
    getPostsByDate,
    createPost,
    updatePost,
    deletePost
}