'use strict';

var express = require('express');

exports.createGame = function(db){
	var cantCreate = false;
  //gameInfo= {
  //  "_id" : String(gameIDValues++),
  //  "title": gameName,
  //  "weapons" : ["Empty Soda Cans",
  //               "Viterbi Finals",
  //               "U-Lock",
  //               "Tommy Trojan's Sword",
  //               "Dining Hall Food",
  //               "Freshman's Longboard"],
  //  "locations" : ["Ground Zero",
  //                 "EVK",
  //                 "Lyon Center",
  //                 "Leavey Library",
  //                 "Traddies",
  //                 "The 90",
  //                 "Bovard",
  //                 "The Row",
  //                 "Campus Center"],
  //  "turnIndex": 0,
  //  "users" : {hostID
  //            },
  //  "answer": {"location":"EVK",
  //             "weapon":"U-Lock",
  //             "user":hostID}//,
  //  // "usersId":[hostID]
  //};

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


//TODO add timestamps to feed item
exports.getStatus = function(gameID){
  var feed = [];
  for (var i = 0; i < 10; i++){
      var time = Date.now();
      var timeUTC = time.valueOf();

    feed.push({
      "accuser":"EVKitty" + i,
      "suspect":"George Tirebiter",
      "weapon":"overly sharp Skittles wrapper",
      "location":"The Row",
        "time":timeUTC
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