const router = require('express').Router();
let Bribes = require('../models/bribes.model');

router.route('/').get((req, res) => {
  Bribes.find()
    .then(bribes => res.json(bribes))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const bribesList = req.body.bribesList

  const newBribesList = new Bribes({bribesList});

  newBribesList.save()
    .then((bribesList) => res.json(bribesList))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
