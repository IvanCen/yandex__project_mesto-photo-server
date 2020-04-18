const router = require('express').Router();
const path = require('path');
const fsPromises = require('fs').promises;

const usersWay = path.join(__dirname, '../data/users.json');
const users = require('../data/users.json');

router.get('/', (req, res) => {
  fsPromises.readFile(usersWay, { encoding: 'utf8' })
    .then((data) => {
      res.send(JSON.parse(data));
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  // eslint-disable-next-line no-underscore-dangle
  const user = users.find((item) => item._id === id);
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ message: 'Нет пользователя с таким id' });
  }
});

module.exports = router;
