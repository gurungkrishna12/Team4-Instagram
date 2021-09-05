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
    required: true,
    type: String
  },
  website:{
    type: String
  },
  bio:{
    type: String,
    required: true,
  },

    social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }   
  }

});

module.exports = Profile = mongoose.model('profile', ProfileSchema);