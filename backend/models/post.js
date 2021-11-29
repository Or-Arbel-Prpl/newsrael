const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const postSchema = new Schema({
  //id will be generated automatically by mongo

  title: { type: String, required: true },
  content: { type: String, required: true },
  
  hashtags: [{ type: String, required: true, ref: 'Hashtag' }],
  // author: { type: String, required: true, ref: 'Author' } ,
  category: { type: String, required: true , ref: 'Category'},

  // hashtags: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Hashtag' }],
  author: { type: mongoose.Types.ObjectId, required: true, ref: 'Author' } ,
  // category: { type: mongoose.Types.ObjectId, required: true , ref: 'Category'},

//   image: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true }
});

postSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Post', postSchema);