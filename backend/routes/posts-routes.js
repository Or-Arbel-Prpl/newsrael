const express = require('express');

const postsControllers = require('../controllers/posts-controllers');
const router = express.Router();


//get all posts
router.get('/', postsControllers.getAllPosts );

//get specific post
router.get('/:pid', postsControllers.getPostById );

//get posts by author
router.get('/author/:aid', postsControllers.getPostsByAuthorId );

//get posts by hashtag
router.get('/hashtag/:hid', postsControllers.getPostsByHashtagId );

//get posts by date
router.get('/date/:date', postsControllers.getPostsByDate );

//create a new post
router.post('/', postsControllers.createPost );

//update a post
router.patch('/:pid', postsControllers.updatePost );

//delete a post
router.delete('/:pid', postsControllers.deletePost );

module.exports = router;