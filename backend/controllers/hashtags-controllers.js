const Hashtag = require('../models/hashtag');
const Post = require('../models/post');
const Author = require('../models/author');
const Comment = require('../models/comment');
const Media = require('../models/media')

const mongoose = require('mongoose');

const getAllHashtags = async(req, res, next) => {
    const hashtags = await Hashtag.find();
    let numOfPosts;

    let result = []; //json variable for the response

    function done(result) {
      res.json({
        hashtags: result.map(hashtag => hashtag.toObject({getters: true}))
      });
    }

    for(let i=0; i<hashtags.length; i++){
        let hashtag = hashtags[i];
        try {
            numOfPosts = await Post.find({ hashtags: hashtag._id });
            hashtag.postsCount = numOfPosts.length;
        } catch (err) {
            const error = new Error('Fetching posts failed, please try again.');
            error.code = 500;
            return next(error); 
        }
        result.push(hashtag);

        if(i+1 === hashtags.length){
            done(result);
        }
    }

};

const addHashtag = async (req, res, next) => {
    let {name} = req.body;

    name = name.trim().toLowerCase().replace(/\s+/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    let slag = name.toLowerCase().replace(/\s+/g, '-');

    // res.send({name, slag});
    
    const exists = await Hashtag.find({name: name});
    if( exists.length > 0 ){
        const error = new Error('This Hashtag already exists.');
        error.code = 500;
        return next(error);
    }

    const createdHashtag = new Hashtag({
        name, 
        slag,
    });

    try {
        await createdHashtag.save();
    } catch (err) {
        const error = new Error('Something went wrong, please try again.');
        error.code = 500;
        return next(error);
    }
    
    res.status(201).json({message: 'Hashtag had been added successfully.', hashtag: createdHashtag});
};

// getHashtagsByPostId = async (req, res, next) => {
//     const postId = req.params.pid;

//          //check if there is a post with that id
//          let post;
//          try {
//              post = await Post.findById(postId);
//          } catch (err) {
//              const error = new Error('Something went wrong, please try again.');
//              error.code = 500;
//              return next(error);
//          }
     
//          if(!post){
//              const error = new Error('Could not find a post with the provided id.');
//              error.code = 404;
//              return next(error);
//          }
         
//          let posthashtags = post.hashtags;
//          let hashtags = await Hashtag.find().where('_id').in(posthashtags).exec();
         
//         //  res.send(hashtags);
//          res.status(200).json({hashtags});
// }

const getHashtagBySlag = async (req, res, next) => {
    const slag = req.params.slag;
    let hashtag;
    let error;
    try {
        hashtag = await Hashtag.findOne({slag: slag});    
    } catch (error) {
        error = new Error('Something went wrong, please try again.');
        error.code = 500;
        return next(error); 
    }
    if(!hashtag){
        error = new Error('Could not find a hashtag for the provided slag.');
        error.code = 404;
        return next(error); 
    }

    res.json({ hashtag });
}

const getPostsByHashtagId = async(req, res, next) => {
    const hashtagId = req.params.hid;

    let posts;
    let author, files;
    let comments = [];
    let hashtags = [];

    try {
        posts = await Post.find({ hashtags: hashtagId });
    } catch (err) {
        const error = new Error('Fetching posts failed, please try again.');
        error.code = 500;
        return next(error); 
    }

    let result = []; //json variable for the response

    function done(result) {
      res.json({
        posts: result.map(post => post.toObject({getters: true}))
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

}

module.exports = {
    getAllHashtags,
    addHashtag,
    // getHashtagsByPostId,
    getHashtagBySlag,
    getPostsByHashtagId
}