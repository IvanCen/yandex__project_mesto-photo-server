const router = require('express').Router();
const path = require('path');
const fsPromises = require('fs').promises;

const usersPath = path.join(__dirname, '../data/users.json');

router.get('/', (req, res) => {
  fsPromises.readFile(usersPath, { encoding: 'utf8' })
    .then((data) => {
      res.send(JSON.parse(data));
    })
    .catch((err) => {
      console.error(err);
    });
});

router.get('/:id', (req, res) => {
  fsPromises.readFile(usersPath, { encoding: 'utf8' })
    .then((data) => JSON.parse(data))
    .then((users) => {
      const { id } = req.params;
      // eslint-disable-next-line no-underscore-dangle
      const user = users.find((item) => item._id === id);
      if (user) {
        res.send(user);
      } else {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
    })
    .catch((err) => {
      console.error(err);
    });
});

module.exports = router;
