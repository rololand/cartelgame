const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemsSchema = new Schema({
    itemsList: {
      type: Array,
      required: true
    }
  }, {
    timestamps: true
  });

const Items = mongoose.model('Items', itemsSchema);
module.exports = Items
