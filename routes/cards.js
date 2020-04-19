const router = require('express').Router();
const path = require('path');
const fsPromises = require('fs').promises;

const cardsPath = path.join(__dirname, '../data/cards.json');

router.get('/', (req, res) => {
  fsPromises.readFile(cardsPath, { encoding: 'utf8' })
    .then((data) => {
      res.send(JSON.parse(data));
    })
    .catch((err) => {
      console.error(err);
    });
});

module.exports = router;
