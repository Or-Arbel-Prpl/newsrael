const express = require('express');

const mediaControllers = require('../controllers/media-controllers');
const router = express.Router();


//get all media
router.get('/', mediaControllers.getAllMedia );

//get a specific file
router.get('/:fid', mediaControllers.getSpecificFile );

//add a new file
router.post('/', mediaControllers.addFile );

//get media by post id
router.get('/post/:pid', mediaControllers.getMediaByPostId );

//get media by post id
router.delete('/post/:pid', mediaControllers.deleteMediaByPostId );

module.exports = router;