const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const heroSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true, //remove white spaces
    minlength: 3
  },
  category: {
    type: String,
    required: true
  },
  gold: {
    type: Number,
    required: true
  },
  stats: {
    type: Object,
    required: true
  }
}, {
  timestamps: true
});

const Hero = mongoose.model('Hero', heroSchema);
module.exports = Hero
