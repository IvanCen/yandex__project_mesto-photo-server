const Card = require('../models/cards');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(err.code)
      .send({ massage: err.code === 500 ? 'Произошла ошибка' : err.massage }));
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(err.code)
      .send({ massage: err.code === 500 ? 'Произошла ошибка' : err.massage }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({
    name,
    link,
    owner,
  })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(err.code)
      .send({ massage: err.code === 500 ? 'Произошла ошибка' : err.massage }));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(() => res.send('Не найдена карточка с таким Id'))
    .then((cardLike) => res.send({ data: cardLike }))
    .catch((err) => res.status(err.code)
      .send({ massage: err.code === 500 ? 'Произошла ошибка' : err.massage }));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => res.send('Не найдена карточка с таким Id'))
    .then((cardLike) => res.send({ data: cardLike }))
    .catch((err) => res.status(err.code)
      .send({ massage: err.code === 500 ? 'Произошла ошибка' : err.massage }));
};
