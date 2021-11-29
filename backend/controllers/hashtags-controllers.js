const Hashtag = require('../models/hashtag');
const Post = require('../models/post');
const mongoose = require('mongoose');

const getAllHashtags = async(req, res, next) => {
    const hashtags = await Hashtag.find();

    // if( !hashtags || hashtags.length === 0 ){
    //     const error = new Error('Could not find hashtags.');
    //     error.code = 404;
    //     return next(error);
    // }
    res.json({ hashtags: hashtags.map(hashtag => hashtag.toObject({getters: true})) });
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

getHashtagsByPostId = async (req, res, next) => {
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
         
         let posthashtags = post.hashtags;
         let hashtags = await Hashtag.find().where('_id').in(posthashtags).exec();
         
        //  res.send(hashtags);
         res.status(200).json({hashtags});
}

const getHashtagBySlag = async (req, res, next) => {
    const slag = req.params.slag;

    const hashtag = await Hashtag.findOne({slag: slag});    

    // if( !hashtag || hashtag.length === 0 ){
    //     const error = new Error('Could not find hashtags.');
    //     error.code = 404;
    //     return next(error);
    // }
    res.json({ hashtag });
    // res.json({ hashtag: hashtag.toObject({getters: true}) });
}

module.exports = {
    getAllHashtags,
    addHashtag,
    getHashtagsByPostId,
    getHashtagBySlag
}