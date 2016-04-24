var mongoose = require('mongoose');

var User = mongoose.model('User', {
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  gameID: {type: String, sparse: true},
  nickName: {type: String, sparse: true}
});

module.exports = User;
