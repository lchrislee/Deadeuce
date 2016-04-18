'use strict';

var express = require('express');
var mongoose = require('mongoose');
var UserSchema = require("../../models/user.js");
var GameSchema = require("../../models/game.js");

var checkList = {
  "locations":[
    "Lyon Center",
    "Leavey Library",
    "Traddies",
    "Ground Zero",
    "The 90",
    "Bovard",
    "EVK",
    "The Row",
    "Campus Center"
  ],
  "weapons":[
    "U-Lock",
    "Tommy Trojan's Sword",
    "overly sharp Skittles wrapper",
    "Freshman on a longboard",
    "Viterbi Finals",
    "Taco Bell's deal of the week"
  ],
  "suspects":[
    "President Nikias",
    "EVKitty",
    "George Tirebiter",
    "Will Ferrell",
    "Tommy Trojan",
    "Pete Caroll"
  ]
};

var initialMap = [
];

/*
  Logic:
    - add game to db
      |-> set turnPlayer to gameCreater
      |-> randomly select 1 Weapon/Location/Suspect to be the murderer/weapon/location
      |-> each player gets 18/(# number of players) pieces of the remaining info
    - # of players (2-6)
    - Chosen Character (or auto chosen based on when users join) for user creating game

    to DELETE on React component
      -Theme, Privacy, (character?)
*/
exports.createGame = function(mongooseDB, hostEmail, gameName){
  var User = mongooseDB.model('User', UserSchema);
  var query = User.where({'email':hostEmail});
  query.findOne(function(err, user){
    if (err){
      return {"gameID":undefined};
    }else{
      var answerLocationNum = Math.floor(Math.random() * 9);
      var answerLocation = checkList.locations[answerLocationNum];
      var answerSuspectNum = Math.floor(Math.random() * 6);
      var answerSuspect = checkList.suspects[answerSuspectNum];
      var answerWeaponNum = Math.floor(Math.random() * 6);
      var answerWeapon = checkList.weapons[answerWeaponNum];

      var Game = mongooseDB.model('Game', GameSchema);
      var newGame = new Game({
        'name':gameName,
        'numPlayers':1,
        'turnPlayer':hostEmail,
        "checklist":checkList,
        "map":[
          {"location": "Lyon Center", "suspectsInLocation":["President Nikias"]},
          {"location": "Leavey Library", "suspectsInLocation":[]},
          {"location": "Traddies", "suspectsInLocation": []},
          {"location": "Ground Zero", "suspectsInLocation": []},
          {"location": "The 90", "suspectsInLocation": []},
          {"location": "Bovard", "suspectsInLocation": []},
          {"location": "EVK", "suspectsInLocation": []},
          {"location": "The Row", "suspectsInLocation": []},
          {"location": "Campus Center", "suspectsInLocation": []}
        ],
        "users":[{"name":"President Nikias", "email":hostEmail}],
        "answer":{"murderer":answerSuspect, "weapon":answerWeapon, "location":answerLocation}
      });

      newGame.save(function(err, game){
        if (err){
          return {"gameID":undefined};
        }else{
          User.update({"email":hostEmail}, {"gameID":game.name}, function(err, raw){
            if (err){
              console.log("error: " + err);
            }
          });
          // console.log(user);
          // user.gameID = game.name;
          // user.save(function(err, u){
          //   if(err){
          //     console.log("error: " + err);
          //   }else{
          //     console.log("good");
          //   }
          // });
          return {"gameID":game.name};
        }
      });
    }
  });
}


//TODO add timestamps to feed item
exports.getStatus = function(gameID){
  var feed = [];
  for (var i = 0; i < 10; i++){
      //var time = Date.now();
      //var timeUTC = time.toUTCString();
      //console.log(time);
    feed.push({
      "accuser":"EVKitty",
      "suspect":"George Tirebiter",
      "weapon":"overly sharp Skittles wrapper",
      "location":"The Row",
        "time":i
    });
  }
  var turnPlayer = "President Nikias";

  //TODO get rid of gameName or include it in query
  return {"feed": feed,
      "gameName": "Omar's Occults",
      "turnPlayer": turnPlayer
      };
}

exports.getChecklist = function(gameID){
  return {"checkList":checkList};
}

exports.getMap = function(gameID){
  return {"gameName":"Michelle's Masterminds",
      "locations": [{"name":"Lyon Center", "players":undefined},
              {"name":"Leavey Library", "players":["EVKitty", "George Tirebiter"]},
              {"name":"Traddies", "players":undefined},
              {"name":"Ground Zero", "players":undefined},
              {"name":"The 90", "players":undefined},
              {"name":"Bovard", "players":["Pete Caroll"]},
              {"name":"EVK", "players":["Will Ferrell"]},
              {"name":"The Row", "players":["President Nikias","Tommy Trojan"]},
              {"name":"Campus Center", "players":undefined}]};
}