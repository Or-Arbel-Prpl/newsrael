const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  //id will be generated automatically by mongo

  author: { type: String, required: true },
  content: { type: String, required: true },
  inResponseToPostId: { type: mongoose.Types.ObjectId, required: true, ref: 'Post' },
  date: { type: Date, required: true },
  state: { type: String }
  
});

commentSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Comment', commentSchema);