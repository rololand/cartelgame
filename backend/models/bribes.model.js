const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bribesSchema = new Schema({
    bribesList: {
      type: Array,
      required: true
    }
  }, {
    timestamps: true
  });

const Bribes = mongoose.model('Bribes', bribesSchema);
module.exports = Bribes
