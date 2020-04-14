const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true, //remove white spaces
    minlength: 3
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  sex: {
    type: String,
    required: true
  },
  class: {
    type: String,
    required: true
  },
  stats: {
    type: Object,
    required: true
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User
