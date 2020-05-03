const router = require('express').Router();
let Lvls = require('../models/lvls.model');

router.route('/').get((req, res) => {
  Lvls.find()
    .then(lvls => res.json(lvls))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const lvlsList = req.body.lvlsList

  const newLvlsList = new Lvls({lvlsList});

  newLvlsList.save()
    .then((lvlsList) => res.json(lvlsList))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
