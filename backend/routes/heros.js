const router = require('express').Router();
let Hero = require('../models/hero.model');

router.route('/').get((req, res) => {
  Hero.find()
    .then(heros => res.json(heros))
    .catch(err => res.status(400).json('Error: ' + err));
}); //show all users

router.route('/:id').get((req, res) => {
  Hero.findById(req.params.id)
    .then(hero => res.json(hero))
    .catch(err => res.status(400).json('Error: ' + err));
}); //show user with specific id

router.route('/findByUsername/:username').get((req, res) => {
  Hero.where({username: req.params.username}).findOne()
    .then(hero => res.json(hero))
    .catch(err => res.status(400).json('Error: ' + err));
}); //show user with specific username

router.route('/add').post((req, res) => {
  const _id = req.body._id;
  const username = req.body.username;
  const category = req.body.category;
  const gold = req.body.gold;
  const stats = req.body.stats;

  const newHero = new Hero({_id, username, category, gold, stats});

  newHero.save()
    .then((hero) => res.json(hero))
    .catch(err => res.status(400).json('Error: ' + err));
}); //add new user

router.route('/delete/:id').delete((req, res) => {
  Hero.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
}); //delete user with specific id

router.route('/update/:id').post((req, res) => {
  Hero.findById(req.params.id)
    .then(hero => {
      hero._id = req.body._id;
      hero.username = req.body.username;
      hero.category = req.body.category;
      hero.gold = req.body.gold;
      hero.exp = req.body.exp;
      hero.expNextLvl = req.body.expNextLvl;
      hero.lvl = req.body.lvl;
      hero.stats = req.body.stats;
      hero.statsAllEquipments = req.body.statsAllEquipments;
      hero.equipment = req.body.equipment;
      hero.backpack = req.body.backpack;
      hero.task = req.body.task;
      hero.avatar = req.body.avatar;

      hero.save()
        .then((hero) => res.json(hero))
        .catch(err => res.status(400).json('Error:' + err))
    })
    .catch(err => res.status(400).json('Error2: ' + err))
});

module.exports = router;
