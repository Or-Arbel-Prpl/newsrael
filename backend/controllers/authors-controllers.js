const Author = require('../models/author');
const Post = require('../models/post');


const getAllAuthors = async (req, res, next) => {
    let authors;
    try {
        authors = await Author.find();
    } catch (err) {
        const error = new Error('Fetching authors failed.');
        error.code = 404;
        return next(error);
    } 

    if( !authors || authors.length === 0 ){
        const error = new Error('Could not find authors.');
        error.code = 404;
        return next(error);
    }
    res.json({ authors: authors.map(author => author.toObject({getters: true})) });
};

const getAuthorById = async (req, res, next) => {
    const authorId = req.params.aid;

    let author;
    try {
        author = await Author.findById(authorId);
    } catch (err) {
        const error = new Error('Fetching author failed, please try again.');
        error.code = 500;
        return next(error); 
    }

    if (!author){
        const error = new Error('Could not find author for the provided id.');
        error.code = 404;
        return next(error);
    }

    res.json({author});

}

const createAuthor = async (req, res, next) => {
    const { name } = req.body;
    //missing id

    const createdAuthor = new Author ({
        name,
        posts: [],
        dateJoined: new Date(),
    });

    try {
        await createdAuthor.save();
    } catch (err) {
        const error = new Error('Creating author failed, please try again.');
        error.code = 500;
        return next(error);
    }
    
    res.status(201).json({author: createdAuthor});
};

module.exports = { 
    getAllAuthors,
    getAuthorById,
    createAuthor,
}