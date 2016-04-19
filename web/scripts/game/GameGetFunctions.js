'use strict';

var express = require('express');

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