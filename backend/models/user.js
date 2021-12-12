const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  //id will be generated automatically by mongo

  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, trim: true, unique: true, lowercase: true },  
  image: {type: String}
  // createdAt: { type: Date, required: true },
}, {timestamps: true});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);