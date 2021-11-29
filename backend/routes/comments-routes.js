const express = require('express');

const commentsControllers= require('../controllers/comments-controllers');
const router = express.Router();

//get all comments
router.get('/', commentsControllers.getAllComments );

//get comments for a specific post
router.get('/post/:pid', commentsControllers.getCommentsForPost );

//delete comments for a specific post
router.delete('/post/:pid', commentsControllers.deleteCommentsByPostId );

//add a new comment
router.post('/', commentsControllers.addComment );

//report on a comment
router.patch('/report/:cid', commentsControllers.reportComment );


module.exports = router;