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
  media:[{
    photos:{
      type: String
    },
    video:{
      type: String
    },
  }]
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);