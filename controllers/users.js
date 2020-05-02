const User = require('../models/users');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      const status = err.status || 500;
      res.status(status)
        .send({ message: err.message });
    });
};

module.exports.getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => res.status(404).send('Not found'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      const status = err.status || 500;
      res.status(status)
        .send({ message: err.message });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({
    name,
    about,
    avatar,
  })
    .orFail(() => res.send('Неверно составлен запрос'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      const status = err.status || 500;
      res.status(status)
        .send({ message: err.message });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about, avatar } = req.body;
  const owner = req.user._id;

  User.findByIdAndUpdate(owner, { name, about, avatar }, { new: true })
    .orFail(() => res.status(404).send('Not found'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      const status = err.status || 500;
      res.status(status)
        .send({ message: err.message });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const owner = req.user._id;

  User.findByIdAndUpdate(owner, { avatar }, { new: true })
    .orFail(() => res.status(404).send('Not found'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      const status = err.status || 500;
      res.status(status)
        .send({ message: err.message });
    });
};
