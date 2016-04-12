'use strict';

var express = require('express');

exports.createUser = function(){
	var userinfo = {
    	"_id" : "user5",
      	"email": "jun@usc.edu",
      	"wins" : 10,
      	"losses": 50
   	};
	var cantCreate = false;

	function createUserEntry(){
	  	db.collection('user').insertOne(userinfo, function(err, resultUser) {
	    	var result = {};
	      	if(!err){
	          	result['userID'] = resultUser.ops[0]._id ;
	          	return result;
	      	}else{
	        	return result;
	      	}
  		});
	};
    console.log(userinfo.email);

    db.collection('user').find({"email":userinfo.email}).count(function(err, count) {
        var result = {};
        if(count >= 1){
            cantCreate = true;
        }
        if(cantCreate){
           result['result'] = "failed";
           return result;
		}else{
			createUserEntry();
		}
	});
}