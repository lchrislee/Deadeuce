'use strict';

var express = require('express');

exports.getGame = function(db){
	var cursor = db.collection('game').find( { "_id": gameIDFind } );
   cursor.each(function(err, doc) {
      if (doc != null) {
        return {"game":doc};
      } else {
        return {"game":undefined};
      }
   });
};

exports.getAllGames = function(){
	var val = [];
  for(var i = 0; i < 15; i++){
    var test = "Omar's Occults " + i;
    val.push({
      gameName: test,
      numberOfPlayers: "5"
    });
  }
  return {gamesList:val};
}

exports.getLocations = function(){
	return {"locations": [{"name":"LYON CENTER","player":""},{"name":"LEAVEY LIBRARY", "player":"EVKitty, George Tirebiter"},{"name":"TRADDIES", "player":""},{"name":"GROUND ZERO", "player":""},{"name":"The 90", "player":""},{"name":"BOVARD", "player":"Pete Caroll"},{"name":"EVK", "player":"Will Ferrell"},{"name":"THE ROW", "player":"President Nikias, Tommy Trojan"},{"name":"CAMPUS CENTER", "player":""}]};
}

exports.getWeapons = function(db){
	var cursor = db.collection('game').find( { "_id": gameIDFind } );
	cursor.each(function(err, doc) {
		if (doc != null) {
			return {"weapons":doc.weapons};
		} else {
			return {"weapons":undefined};
		}
	});
}

exports.getUsers = function(db){
	var cursor = db.collection('game').find( { "_id": gameIDFind } );
	cursor.each(function(err, doc) {
		if (doc != null) {
			return {"users":doc.usersId};
		} else {
			return{"users":undefined};
		}
   	});
}

exports.getUsersCount = function (){

}

exports.getChecklist = function(){

}

exports.getUserChecklist = function(db){
	var cursor = db.collection('game').find( { "_id": gameIDFind } );
	cursor.each(function(err, doc) {
		if (doc != null) {
			console.log(doc.users[userIDFind].checkList);
			return {"checklist": doc.users[userIDFind].checkList};
		} else {
			return {"checklist": undefined};
		}
	});
}

exports.getUserClues = function(db){
	var cursor = db.collection('game').find( { "_id": gameIDFind } );
	cursor.each(function(err, doc) {
		if (doc != null) {
			return {"clues": doc.users[userIDFind].hand};
		} else {
			return {"clues": undefined};
		}
	});
}

exports.getUserTurn = function(db){
	var cursor = db.collection('game').find( { "_id": gameIDFind } );
	cursor.each(function(err, doc) {
		if (doc != null) {
			return {"message": doc.users[doc.turn]};
		} else {
			return {"message": undefined};
		}
	});
}