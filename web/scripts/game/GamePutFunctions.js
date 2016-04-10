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

exports.accuse = function(){
	var cursor = db.collection('game').find( { "_id": gameID } );
	cursor.each(function(err, doc) {
		if (doc != null) {
			var answer = doc.answer;
        	var set = {};
        	var result = {};
        	console.log(answer.location + " " + accusation.location + " " +answer.user + " " +accusation.user + " " +answer.weapon + " " +accusation.weapon);
        	if(answer.location == accusation.location && answer.user == accusation.user && answer.weapon == accusation.weapon){
          	//correct
           		set['winner'] =  userID;
           		set['gameover'] = true;
           		result['correct'] = true;
           		result['gameover'] = true;
        	}else{
          	//incorrect
          		set['users.' + userID + ".lose"] = true;
          		result['correct'] = false;
        	}

        	db.collection('game').updateOne(
            	{ "_id" : gameID  },
            	{ $set: set },
            	function(err, results) {
              		if(!err){
                		return result;
              		}else{
                		return result;
              		}
          	});
  		} else {
      	}
   	});
}

exports.suggest = function(){
	var cursor = db.collection('game').find( { "_id": gameID } );
	cursor.each(function(err, doc) {
		if (doc != null) {
        	var answer = doc.answer;
        	var set = {};
        	var result = {};
        	if(answer.location == suggestion.location && answer.user == suggestion.user && answer.weapon == suggestion.weapon){
          	//correct
           		result['correct'] = true;
        	}else{
          	//incorrect
          		result['correct'] = false;
        	}

          	//next turn
          	var nextTurn = doc.users[doc.turn + 1];
          	db.collection('game').updateOne(
            	{ "_id" : gameID },
            	{ $set: { "turn": doc.turn + 1} },
            	function(err, results) {
              		console.log(results);
              		if(!err){
                		result['result'] = "success";
                		result['nextTurn'] = nextTurn;
                		return result;
              		}else{
               			result['result'] = "failed";
                		return result;
					}
         	});
      	} else {
      	}
   	});
}

exports.updateChecklist = function(){
	var path = "users." + userIDFind + ".checkList";
	db.collection('game').updateOne(
		{ "_id" : gameIDFind },
		{ $set: { path:check} },
        function(err, results) {
        	if(!err){
                return {"result": "success",
						"checklist": check};
			}else{
                return {"checklist": undefined};
			}
	});
}

exports.updateTurn = function(){
	var cursor = db.collection('game').find( { "_id": gameIDFind } );
   	cursor.each(function(err, doc) {
		if (doc != null) {
			var nextTurn = doc.users[doc.turn + 1];
			db.collection('game').updateOne(
            	{ "_id" : gameIDFind },
            	{ $set: { "turn": doc.turn + 1} },
            	function(err, results) {
              		console.log(results);
              		if(!err){
            			return {"result": "success",
								"nextTurn": nextTurn};
              		}
         	});
      	}
    });
}

exports.takeAction = function(gameID, userID, weapon, suspect, location, action){
  if (action == "suggest"){
    return {"correct":false, "feedback":"I DONE IT", "action":"Suggestion"};
  }else if (action == "accuse"){
    return {"correct":true, "action":"Accusation"};
  }
}