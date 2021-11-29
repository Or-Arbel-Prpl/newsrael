const express = require('express');

const hashtagsControllers = require('../controllers/hashtags-controllers');
const router = express.Router();


//get all hashtags
router.get('/', hashtagsControllers.getAllHashtags );

//add a new hashtag
router.post('/', hashtagsControllers.addHashtag );

//get hashtags by post id
router.get('/post/:pid', hashtagsControllers.getHashtagsByPostId );

//get hashtag by slag
router.get('/slag/:slag', hashtagsControllers.getHashtagBySlag );

module.exports = router;