'use strict';

var express = require('express');

exports.getUser = function(){
	var user = {
	    "username": "EVKiller",
	    "profPicUrl": "/DivePortrait.jpg",
	    "wins": "100",
	    "losses": "0",
  	};

  	return user;

  	// var userIDFind = request.body.userID;
	// 
     // var cursor = db.collection('user').find( { "_id": userIDFind } );
     // cursor.each(function(err, doc) {
     //    if (doc != null) {
     	// 
     //          response.json({"userInfo": doc});
     //    } else {
     //    }
     // });
}

exports.getUserStats = function(){
	var userID = request.body.userID;
	var cursor = db.collection('user').find( { "_id": userID } );
   	cursor.each(function(err, doc) {
		if (doc != null) {
        	return {"wins":doc.wins};
		} else {
		}
	});
}

exports.getUserCurrentGame = function(){
	var userID = request.body.userID;
  	var cursor = db.collection('user').find( { "_id": userID } );
   	cursor.each(function(err, doc) {
		if (doc != null) {
        	return {"game":doc.game};
      	} else {
      	}
   	});
}