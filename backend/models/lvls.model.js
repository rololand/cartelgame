const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const lvlsSchema = new Schema({
  lvlsList: {
    type: Array,
    required: true
  }
}, {
  timestamps: true
});

const Lvls = mongoose.model('Lvls', lvlsSchema);
module.exports = Lvls
