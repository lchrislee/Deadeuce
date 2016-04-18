var mongoose = require('mongoose');

var User = mongoose.model('User', {
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  gameID: {type: String, unique: true},
});

module.exports = User;