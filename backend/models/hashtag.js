const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const hashtagSchema = new Schema({
  //id will be generated automatically by mongo

  name: { type: String, required: true, unique: true },
  slag: { type: String, required: true, unique: true },
  postsCount: {type: Number}
  
}, {timestamps: true});

hashtagSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Hashtag', hashtagSchema);