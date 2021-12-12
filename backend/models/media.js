const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const mediaSchema = new Schema({
  //id will be generated automatically by mongo

  postId: { type: mongoose.Types.ObjectId , required: true},
  url: { type: String, required: true, unique: true },
  
}, {timestamps: true});

mediaSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Media', mediaSchema);