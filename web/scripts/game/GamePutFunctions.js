'use strict';

var express = require('express');

exports.joinGame = function(){
	var result = {
    	joinSuccess: true,
      gameID: "1234567"
  };
  return result;

  // var set = {};
  // var cursor = db.collection('game').find( { "title": gameName } );

  // cursor.each(function(err, doc) {
  // if (doc != null) {
  //   var currentUserIDs = doc.users;
  //   currentUserIDs[currentUserIDs.length] = userID;
  //   set['users.' + userID] = {"_id": userID};

  //   var cantJoin = false;
  //   if(doc.users != undefined){
  //     if(doc.users.length >= doc.maxUser){
  //       cantJoin = true;
  //     }
  //   }

  //   if(cantJoin){
  //     var result = {};
  //     result['joinSuccess'] = false;
  //     response.json(result);
  //   }

  //   if(!cantJoin){

  //     db.collection('game').updateOne(
  //       { "title" : gameName  },
  //       { $set: set },
  //       function(err, results) {
        
  //        // console.log(results);

  //         if(!err){
  //           var cursor = db.collection('user').find( { "_id": userID } );
  //           cursor.each(function(err, userdoc) {
  //           if (userdoc != null) {
  //             var userGame = userdoc.game;
  //             if(!userGame){
  //               userGame = [];
  //               userGame[userGame.length] = gameID;
  //             }else{
  //               userGame[userGame.length] = gameID;
  //             }
  //             db.collection('user').updateOne(
  //               { "_id" : userID },
  //               { $set: { "game": userGame} },
  //               function(err, results) {
  //                 if(!err){
  //                   var result = {};
  //                   result['joinSuccess'] = true;
  //                   console.log("success");
  //                   result['nextTurn'] = nextTurn;
  //                   response.json(result);
  //                 }else{
  //                   var result = {};
  //                   result['joinSuccess'] = false;
  //                   console.log("failing");
  //                   response.json(result);

  //                 }
  //               });
  //             }
  //           });
  //         }else{
  //           //error
  //           var result = {};

  //           result['joinSuccess'] = false;
  //           response.json(result);
  //         }
  //       });
  //       }
  //     } else {
  //     }
  //  });
}

exports.takeAction = function(gameID, userID, weapon, suspect, location, action){
  if (action == "suggest"){
    return {"correct":false, "feedback":"I DONE IT", "action":"Suggestion"};
  }else if (action == "accuse"){
    return {"correct":true, "action":"Accusation"};
  }
}