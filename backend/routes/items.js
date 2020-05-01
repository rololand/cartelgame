const router = require('express').Router();
let Items = require('../models/items.model');

router.route('/').get((req, res) => {
  Items.find()
    .then(items => res.json(items))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const itemsList = req.body.itemsList

  const newItemsList = new Items({itemsList});

  newItemsList.save()
    .then((itemsList) => res.json(itemsList))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
