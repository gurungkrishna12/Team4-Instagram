const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user:{
    type: Schema.Types.ObjectId,
    ref:'user'
  },
  handle:{
    type: String,
    required: true,
    max: 40
  },
  pronoun:{
    type: String
  },
  website:{
    type: String
  },
  bio:{
    type: String,
    required: true,
  },
  image:[{
    caption: String,
    image: String,

  }]
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);