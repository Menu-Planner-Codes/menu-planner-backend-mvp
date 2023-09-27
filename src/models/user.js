const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  ipAddress: {
    type: String,
  },
  age: {
    type : Number
  },
  allergies: {
    type: String
  },
  pref: {
    type: String
  },
  cuisine: {
    type: String
  }
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
