const User = require('../models/users');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(err.code).send({ massage: err.code === 500 ? 'Произошла ошибка' : err.massage }));
};

module.exports.getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(err.code).send({ massage: err.code === 500 ? 'Произошла ошибка' : err.massage }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({
    name,
    about,
    avatar,
  })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(err.code).send({ massage: err.code === 500 ? 'Произошла ошибка' : err.massage }));
};

module.exports.updateUser = (req, res) => {
  const { name, about, avatar } = req.body;
  const owner = req.user._id;

  User.findByIdAndUpdate(owner, { name, about, avatar }, { new: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(err.code).send({ massage: err.code === 500 ? 'Произошла ошибка' : err.massage }));
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const owner = req.user._id;

  User.findByIdAndUpdate(owner, { avatar }, { new: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(err.code).send({ massage: err.code === 500 ? 'Произошла ошибка' : err.massage }));
};
