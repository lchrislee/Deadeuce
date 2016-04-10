'use strict';

var express = require('express');

exports.createGame = function(db){
	var cantCreate = false;
  gameInfo= {
    "_id" : String(gameIDValues++),
    "title": gameName,
    "weapons" : ["Empty Soda Cans",
                 "Viterbi Finals",
                 "U-Lock",
                 "Tommy Trojan's Sword",
                 "Dining Hall Food",
                 "Freshman's Longboard"],
    "locations" : ["Ground Zero",
                   "EVK",
                   "Lyon Center",
                   "Leavey Library",
                   "Traddies",
                   "The 90",
                   "Bovard",
                   "The Row",
                   "Campus Center"],
    "turnIndex": 0,
    "users" : {hostID
              },
    "answer": {"location":"EVK",
               "weapon":"U-Lock",
               "user":hostID}//,
    // "usersId":[hostID]
  };

  function createGameEntry(){
    db.collection('game').insertOne(gameInfo, function(err, resultGame) {
      console.log(resultGame);
      var result = {};
      if(!err){
        result['gameID'] = resultGame.ops[0]._id;
        return result;
      }else{
        return result;
      }
    });
  };

  db.collection('game').find({"title":gameInfo.title}).count(function(err, count) {
    var result = {};
    if(count >= 1){
      cantCreate = true;
    }
    if(cantCreate){
      result['result'] = "failed";
      return result;
    }else{
      return createGameEntry();
    }
  });
}