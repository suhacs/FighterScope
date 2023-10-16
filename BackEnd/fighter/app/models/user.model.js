const mongoose = require('mongoose');
const User = mongoose.model(
  'user',
  new mongoose.Schema({
    name: String,
    nickName: String,
    email: String,
    password: String,
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'role' },
  })
);

module.exports = User;
