const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const instance = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  caption: String,
  image: String,
  comments: [],
});

module.exports = PostImage = mongoose.model('posts', instance);
