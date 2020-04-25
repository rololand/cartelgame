const router = require('express').Router();
let Tasks = require('../models/tasks.model');

router.route('/').get((req, res) => {
  Tasks.find()
    .then(tasks => res.json(tasks))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const tasksList = req.body.tasksList

  const newTasksList = new Tasks({tasksList});

  newTasksList.save()
    .then((tasksList) => res.json(tasksList))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
