const router = require('express').Router();
const path = require('path');
const fsPromises = require('fs').promises;

const cardsWay = path.join(__dirname, '../data/cards.json');

router.get('/', (req, res) => {
  fsPromises.readFile(cardsWay, { encoding: 'utf8' })
    .then((data) => {
      res.send(JSON.parse(data));
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;