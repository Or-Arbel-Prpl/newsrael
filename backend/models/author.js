const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const authorSchema = new Schema({
    //id will be generated automatically by mongo
    //   image: { type: String, required: true },

    name: { type: String, required: true },
    // posts: [{ type: mongoose.Types.ObjectId}],
    posts: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Post' }],
    // dateJoined: { type: Date, required: true }
}, {timestamps: true});

authorSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Author', authorSchema);