const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^(((https?):\/\/)|(www\.)?)(((\d{1,3}\.){3}\d{1,3}(?!\d)(?!\w))|(([\w-]+)(\.?[a-zA-Z]{2,})+(?!\d)))(:\d{2,5}(?!\d)(?!\w{1,4}))?\/?((?<=\/)([\w\S/-]+))?#?$/.test(v);
      },
      message: (props) => `${props.value} is not a URL link!`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'user',
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
