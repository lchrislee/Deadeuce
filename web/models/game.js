var mongoose = require('mongoose');

var Game = mongoose.model('Game', {
  name: {type: String, required: true, unique: true},
  numPlayers: {type: Number, required: true},
  turnPlayer: {type: String, required: true},
  checklist: {
  	locations: [String],
  	suspects: [String],
  	weapons: [String]
  },
  map: [{
  	location: String,
  	suspectsInLocation: [String]
  }],
  feed: [{
    accuser : String,
    suspect : String,
    weapon : String,
    location : String,
    time : Date
  }],
  users: [{
    name : String,
    email : String
   }]
});

module.exports = Game;