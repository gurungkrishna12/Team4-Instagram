const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user:{
    type: Schema.Types.ObjectId,
    ref:'login'
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
    type: String
  },
  posts:[{
    photos:{
      type: String
    },
    reel:{
      type: String
    },
    IGTV:{
      type: String
    }
  }]
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);