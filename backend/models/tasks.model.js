const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tasksSchema = new Schema({
    tasksList: {
      type: Array,
      required: true
    }
  }, {
    timestamps: true
  });

const Tasks = mongoose.model('Tasks', tasksSchema);
module.exports = Tasks
