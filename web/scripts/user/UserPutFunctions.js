'use strict';

var express = require('express');

exports.updateUser = function(){
	return {"message": "This UPDATES a USER"};
}

exports.updateUserGame = function(){
	return {"message": "This UPDATES user's current GAME"};
}