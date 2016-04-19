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
    email : String,
    hand: [String]
   }],
  answer: {
    murderer: String,
    weapon: String,
    location: String
  },
  potentialCards: [String]
});

gameSchema.methods.addPlayer = function (user, cb) {
  var number1 = Math.floor(Math.random()*18);
  var number2 = Math.floor(Math.random()*18);
  while (number2 == number1){
    number2 = Math.floor(Math.random()*18);
  }
  var number3 = Math.floor(Math.random()*18);
  while (number3 == number1 || number3 == number2){
    number3 = Math.floor(Math.random()*18);
  }
  var userCard1 = this.potentialCards[number1];
  var userCard2 = this.potentialCards[number2];
  var userCard3 = this.potentialCards[number3];

  user.hand = [userCard1, userCard2, userCard3];

  this.users.push(user);
  this.numPlayers = this.numPlayers + 1;
  var mapIndex = Math.floor(Math.random()*this.map.length);
  this.map[mapIndex].suspectsInLocation.push(user.name);
  this.save(cb);
}

var Game = mongoose.model('Game', gameSchema);

module.exports = Game;