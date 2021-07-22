const mongoose = require('mongoose');
const schema = mongoose.schema;

const userSchema = new schema({
  name: {
    type: String,
    required: true
  },
  email:{
    typre: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  avatar:{
    type: String
  }
  date:{
    type: Date,
    default: Date.now
  }
})