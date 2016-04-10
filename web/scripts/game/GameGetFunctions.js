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
	//FILL ME
}

exports.getChecklist = function(){
	//FILL ME
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

//TODO add timestamps to feed item
exports.getStatus = function(gameID){
	var feed = [];
	for (var i = 0; i < 10; i++){
		feed.push({
			"accuser":"EVKitty",
			"suspect":"George Tirebiter",
			"weapon":"overly sharp Skittles wrapper",
			"location":"The Row"
		});
	}
	var turnPlayer = "President Nikias";

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

	//TODO get rid of gameName or include it in query
	return {"feed": feed,
			"gameName": "Omar's Occults",
			"turnPlayer": turnPlayer,
			"checkList": checkList
			};
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