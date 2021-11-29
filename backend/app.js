const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts-routes')
const authorsRoutes = require('./routes/authors-routes')
const commentsRoutes = require('./routes/comments-routes')
const usersRoutes = require('./routes/users-routes')
const hashtagsRoutes = require('./routes/hashtags-routes')

const app = express();

app.use(bodyParser.json());

//cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    next();
});

app.use('/api/posts',postsRoutes);
app.use('/api/authors',authorsRoutes);
app.use('/api/comments',commentsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/hashtags', hashtagsRoutes);

app.use((req, res, next) => {
    const error = new Error('Could not find this route.');
        error.code = 404;
        return next(error);
});

//errors middleware
app.use((error, req, res, next) => {
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500)
    res.json({message: error.message || 'An unknown error occurred!'});
});


mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.yakwc.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
.then(() => {
    app.listen(5000);
})
.catch(err => {
    console.log(err);
})