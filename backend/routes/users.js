const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
}); //show all users

router.route('/:id').get((req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
}); //show user with specific id

router.route('/findByUsername/:username').get((req, res) => {
  User.where({username: req.params.username}).findOne()
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
}); //show user with specific username

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const newUser = new User({username, password});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
}); //add new user

router.route('/delete/:id').delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
}); //delete user with specific id

router.route('/update/:id').post((req, res) => {
  User.findById(req.params.id)
    .then(user => {
      user.username = req.body.username;
      user.password = req.body.password;

      user.save()
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error:' + err))
    })
    .catch(err => res.status(400).json('Error2: ' + err))
});

module.exports = router;
