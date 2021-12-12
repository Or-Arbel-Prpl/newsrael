// const Hashtag = require('../models/hashtag');
const Post = require('../models/post');
const Media = require('../models/media')
const mongoose = require('mongoose');

const getAllMedia = async(req, res, next) => {
    const files = await Media.find();
    res.json({ files: files.map(file => file.toObject({getters: true})) });
};

const getSpecificFile = async(req, res, next) => {
    const fileId = req.params.fid;

    let file;
    try {
        file = await Media.findById(fileId);
    } catch (err) {
        const error = new Error('Something went wrong, could not find a post.');
        error.code = 500;
        return next(error); 
    }

    if(!file){
        const error = new Error('Could not find a file for the provided id.');
        error.code = 404;
        return next(error);
    }


    res.json({file: file.toObject({getters: true})}); 
};

const addFile = async(req, res, next) => {
    const { postId, url } = req.body;
    //missing id

    const createdFile = new Media({
        postId,
        url
    });

    // check if that post id exists
    let post;
    try {
        post = await Post.findById(postId);
    } catch (err) {
        const error = new Error('Creating post failed, please try again.');
        error.code = 500;
        return next(error);
    }

    if(!post){
        const error = new Error('Could not find post for provided id.');
        error.code = 404;
        return next(error);
    }

    try {
        await createdFile.save();
    } catch (err) {
        const error = new Error('Creating file failed, please try again.');
        error.code = 500;
        return next(error);
    }

res.status(201).json({file: createdFile});
};

const getMediaByPostId = async(req, res, next) => {
    let files;
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
        const error = new Error('Could not find post for provided id.');
        error.code = 404;
        return next(error);
    }

    try {
        files = await Media.find({ postId: postId});
    } catch (err) {
        const error = new Error('Fetching files failed, please try again.');
        error.code = 500;
        return next(error);
    }

    res.json(files)
}

const deleteMediaByPostId = async (req, res, next) => {
    const postId = req.params.pid;

    let postToDelete;
    try {
        postToDelete = await Post.findById(postId);
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
        await Media.deleteMany({ postId: postId })
    } catch (err) {
        const error = new Error('Something went wrong, could not delete media.');
        error.code = 500;
        return next(error);
    }

    res.status(200).json({message: 'Media deleted successfully.' });

}


module.exports = {
    getAllMedia,
    getSpecificFile,
    addFile,
    getMediaByPostId,
    deleteMediaByPostId
}