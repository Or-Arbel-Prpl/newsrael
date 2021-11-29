const express = require('express');

const authorsControllers = require('../controllers/authors-controllers');
const router = express.Router();


//get all authors
router.get('/', authorsControllers.getAllAuthors );

//get specific author
router.get('/:aid', authorsControllers.getAuthorById );

//create a new author
router.post('/', authorsControllers.createAuthor );

module.exports = router;