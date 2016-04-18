var mongoose = require('mongoose');


var gameSchema = mongoose.Schema({
  name: {type: String, required: true, unique: true},
  numPlayers: {type: Number, required: true},
  turnPlayer: {type: String, required: true},
  gameWinner: String,
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
   }],
  answer: {
    murderer: String,
    weapon: String,
    location: String
  }
});

gameSchema.methods.addPlayer = function (user, cb) {
  this.users.push(user);
  this.numPlayers = this.numPlayers + 1;
  this.save(cb);
}

var Game = mongoose.model('Game', gameSchema);

module.exports = Game;