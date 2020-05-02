const Card = require('../models/cards');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      const status = err.status || 500;
      res.status(status)
        .send({ message: err.message });
    });
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .orFail(() => res.status(404).send('Not found'))
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      const status = err.status || 500;
      res.status(status)
        .send({ message: err.message });
    });
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
    .catch((err) => {
      const status = err.status || 500;
      res.status(status)
        .send({ message: err.message });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(() => res.status(404).send('Not found'))
    .then((cardLike) => res.send({ data: cardLike }))
    .catch((err) => {
      const status = err.status || 500;
      res.status(status)
        .send({ message: err.message });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => res.status(404).send('Not found'))
    .then((cardLike) => res.send({ data: cardLike }))
    .catch((err) => {
      const status = err.status || 500;
      res.status(status)
        .send({ message: err.message });
    });
};
